import { useEffect, useRef } from "react";

type InputWithLabelProps = {
    todoTitle: string;
    handleTitleChange: React.ChangeEventHandler<HTMLInputElement>;
    children: React.ReactNode;
    
}

const InputWithLabel = ({ todoTitle, handleTitleChange, children,}: InputWithLabelProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    });

    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
            <input
                id="todoTitle"
                data-testid="todoTitle"
                name="title"
                type="text"
                placeholder="Add task"
                value={todoTitle}
                onChange={handleTitleChange}
                ref={inputRef}
            />
        </>
    );
};

export default InputWithLabel;


