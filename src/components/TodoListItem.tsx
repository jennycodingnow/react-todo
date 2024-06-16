import { FaTrash } from "react-icons/fa";
import "./TodoListItem.css";

type TodoListItemProps = {
    todo: TodoItem;
    onRemoveTodo: (id: number) => void;
};

const TodoListItem = ({ todo, onRemoveTodo}: TodoListItemProps) => {

    return (
        <div className="TodoListItemContainer">
            <li className="ListItem">{todo.title}</li>
            <button
                type="button"
                className="remove-button"
                onClick={() => onRemoveTodo(todo.id)}
            >
                <FaTrash className="FaTrashIcon" />
            </button>
        </div>
    );
};
export default TodoListItem;

