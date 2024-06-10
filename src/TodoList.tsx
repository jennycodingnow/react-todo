import TodoListItem from "./TodoListItem";


type TodoListProps = {
    todoList: TodoItem[];
    onRemoveTodo: (id: number) => void;
};

const TodoList = ({ todoList, onRemoveTodo }: TodoListProps) => {
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

