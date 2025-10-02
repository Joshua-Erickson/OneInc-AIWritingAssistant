import { useRef, useEffect } from "react";

type InputFormProps = {
  text: string;
  setText: (value: string) => void;
  loading: boolean;
  onProcess: () => void;
  onCancel: () => void;
};

export default function InputForm({ text, setText, loading, onProcess, onCancel }: InputFormProps) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }
    }, [text]);
    
    return (
        <div className="input-container mb-4">
            <textarea
                // type="text"
                ref={textareaRef}
                className="full-width-input"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
                rows={1}
            />
            <div className="button-row">
                {!loading && ( <button onClick={onProcess} disabled={loading}>Process</button> )}
                {loading && ( <button onClick={onCancel}>Cancel</button> )}
            </div>
        </div>
    );
}
