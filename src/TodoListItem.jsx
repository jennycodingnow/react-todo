import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoListItem.module.css";

const TodoListItem = (props) => {
    const { todo, onRemoveTodo } = props;
    return (
        <div className={styles.TodoListItemContainer}>
            <li className={styles.ListItem}>{todo.title}</li>
            <button
                type="button"
                className="remove-button"
                onClick={() => onRemoveTodo(todo.id)}
            >
                <FaTrash className={styles.FaTrashIcon} />
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
