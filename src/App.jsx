import { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

// const todoList = [
//     { id: 1, title: "Complete lesson one assignment" },
//     { id: 2, title: "Practice Leetcode" },
//     { id: 3, title: "Do Laundry" },
// ];

function App() {
    const [todoList, setTodoList] = useState([]);

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
