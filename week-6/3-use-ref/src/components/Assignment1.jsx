import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.
// .focus() method can be used to focus the input field.
export function Assignment1() {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    const handleButtonClick = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input 
            ref = {inputRef}
            type="text" placeholder="Enter text here" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
