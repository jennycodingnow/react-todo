import PropTypes from "prop-types";
import { ChangeEvent, FormEvent, useState } from "react";
import InputWithLabel from "./InputWithLabel";
import "./AddTodoForm.css";

type AddTodoProps = {
    onAddTodo: (todo: TodoItem) => void
}

const AddTodoForm = ({ onAddTodo }: AddTodoProps) => {
    
    const [todoTitle, setTodoTitle] = useState("");

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(todoTitle);
        onAddTodo({ title: todoTitle, id: Date.now() });
        setTodoTitle("");
    };

    return (
        <form className="add-todo-form-container" onSubmit={handleAddTodo}>
            <InputWithLabel
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

