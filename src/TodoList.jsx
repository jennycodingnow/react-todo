import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

const TodoList = (props) => {
    const { todoList, onRemoveTodo } = props;

    return (
        <ul>
            {todoList.map((item) => (
                <TodoListItem
                    key={item.id}
                    todo={item}
                    onRemoveTodo={onRemoveTodo}
                />
            ))}
        </ul>
    );
};

export default TodoList;

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};
