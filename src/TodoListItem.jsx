import PropTypes from "prop-types";
import "./TodoListItem.css";

const TodoListItem = (props) => {
    const { todo, onRemoveTodo } = props;
    return (
        <div className="todo-list-item-container">
            <li className="todo-title">{todo.title}</li>
            <button type="button" onClick={() => onRemoveTodo(todo.id)}>
                Remove
            </button>
        </div>
    );
};
export default TodoListItem;

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};
