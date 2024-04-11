import PropTypes from "prop-types";
import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import "./AddTodoForm.css";

const AddTodoForm = (props) => {
    const { onAddTodo } = props;
    const [todoTitle, setTodoTitle] = useState("");

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        console.log(todoTitle);
        onAddTodo({ title: todoTitle, id: Date.now() });
        setTodoTitle("");
    };

    return (
        <form className="add-todo-form-container" onSubmit={handleAddTodo}>
            <InputWithLabel
                className="todo-input"
                todoTitle={todoTitle}
                handleTitleChange={handleTitleChange}
            >
                Title:
            </InputWithLabel>
            <button type="submit" className="add-button">
                Add
            </button>
        </form>
    );
};

export default AddTodoForm;

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};
