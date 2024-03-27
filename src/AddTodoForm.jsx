import PropTypes from "prop-types";
import { useState } from "react";

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
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input
                id="todoTitle"
                name="title"
                type="text"
                placeholder="Add task"
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};
