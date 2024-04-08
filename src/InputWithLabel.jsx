import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const InputWithLabel = (props) => {
    const { todoTitle, handleTitleChange, children } = props;
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <>
            <label htmlFor="todoTitle">{children}</label>
            <input
                id="todoTitle"
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

InputWithLabel.propTypes = {
    todoTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
