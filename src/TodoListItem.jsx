import PropTypes from "prop-types";

const TodoListItem = (props) => {
    return <li>{props.todo.title}</li>;
};
export default TodoListItem;

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};
