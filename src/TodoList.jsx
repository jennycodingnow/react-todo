import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

const TodoList = (props) => {
    const { todoList } = props;
    return (
        <ul>
            {todoList.map((item) => (
                <TodoListItem key={item.id} todo={item} />
            ))}
        </ul>
    );
};

export default TodoList;

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};
