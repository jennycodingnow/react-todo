import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

// const todoList = [
//     { id: 1, title: "Complete lesson one assignment" },
//     { id: 2, title: "Practice Leetcode" },
//     { id: 3, title: "Do Laundry" },
// ];

const useSemiPersistentState = () => {
    const [todoList, setTodoList] = useState(
        JSON.parse(localStorage.getItem("savedTodoList")) || []
    );

    useEffect(() => {
        localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }, [todoList]);
    return [todoList, setTodoList];
};

function App() {
    const [todoList, setTodoList] = useSemiPersistentState();

    const addTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]);
    };

    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} />
        </>
    );
}

export default App;
