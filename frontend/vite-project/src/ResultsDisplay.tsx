type Results = {
    professional: string;
    casual: string;
    polite: string;
    "social-media": string;
};

type ResultsDisplayProps = {
    results: Results;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
    const nonEmptyResults = Object.entries(results).filter(([_, output]) => output.trim() !== "");

    if (nonEmptyResults.length === 0) return null;

    return (
        <div className="result-container">
            {nonEmptyResults.map(([style, output]) => (
                <div key={style} className="result-box">
                    <h2>{capitalize(style)}:</h2>
                    <div>{output}</div>
                </div>
            ))}
        </div>
    );
}
