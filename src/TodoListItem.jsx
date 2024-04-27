import PropTypes from "prop-types";
import "./TodoListItem.css";
import { FaTrash } from "react-icons/fa";

const TodoListItem = (props) => {
    const { todo, onRemoveTodo } = props;
    return (
        <div className="todo-list-item-container">
            <li className="todo-title">{todo.title}</li>
            <button
                type="button"
                className="remove-button"
                onClick={() => onRemoveTodo(todo.id)}
            >
                <FaTrash />
            </button>
        </div>
    );
};
export default TodoListItem;

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};
