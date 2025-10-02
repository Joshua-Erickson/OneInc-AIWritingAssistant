import { useState, useRef } from 'react'
import InputForm from "./InputForm";
import ResultsDisplay from "./ResultsDisplay";

type Results = {
    professional: string;
    casual: string;
    polite: string;
    "social-media": string;
};

function App() {
    const [text, setText] = useState("");
    const [results, setResults] = useState<Results>({
        professional: "",
        casual: "",
        polite: "",
        "social-media": "",
    });
    const [loading, setLoading] = useState(false);
    const cancelTokenRef = useRef<AbortController | null>(null);

    const handleProcessButton = async () => {
        if (loading) return;

        setLoading(true);
        setResults({
            professional: "",
            casual: "",
            polite: "",
            "social-media": "",
        });

        cancelTokenRef.current = new AbortController();

        try{
            const response = await fetch("http://127.0.0.1:8000/api/rephrase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({text}),
                signal: cancelTokenRef.current.signal,
            });

            if(!response.body){
                throw new Error("Streaming not support")
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let buffer = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;

                const liveResults = parseResults(buffer);

                setResults(prev => ({
                    ...prev,
                    ...liveResults,
                }));
            }
        }
        catch(error){
            console.error("Streaming error:", error);
            setResults({
                professional: "",
                casual: "",
                polite: "",
                "social-media": "",
            });
        }
        finally{
            setLoading(false)
            cancelTokenRef.current = null;
        }
    };

    const handleCancelButton = () => {
        if(cancelTokenRef.current){
            cancelTokenRef.current.abort();
            console.log("Streaming request canceled")
        }
        setLoading(false);
        cancelTokenRef.current = null;
    };

    const parseResults = (text: string): Results => {
        const Pattern = /(Professional|Casual|Polite|Social-Media):\s*([\s\S]*?)(?=Professional|Casual|Polite|Social-Media|$)/gi;

        const parsed: Results = {
            professional: "",
            casual: "",
            polite: "",
            "social-media": "",
        }

        let match;
        while((match = Pattern.exec(text)) !== null){
            const key = match[1].toLowerCase().replace(" ", "-") as keyof Results;
            parsed[key] = match[2].trim();
        }

        return parsed;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-25">
            <div className="container p-6 bg-white shadow-md rounded">
                <h1 className="header font-bold mb-4">Response Assistant</h1>
                    <InputForm
                        text={text}
                        setText={setText}
                        loading={loading}
                        onProcess={handleProcessButton}
                        onCancel={handleCancelButton}
                    />
                <ResultsDisplay results={results} />
            </div>
        </div>
    );
}

export default App;