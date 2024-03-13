import PropTypes from "prop-types";

const AddTodoForm = (props) => {
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.title.value;
        console.log(todoTitle);
        event.target.title.value = "";
        props.onAddTodo(todoTitle);
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input
                id="todoTitle"
                name="title"
                type="text"
                placeholder="Add task"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};
