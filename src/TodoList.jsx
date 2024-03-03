import React from 'react';

const todoList = [
    {id:1, title: "Complete lesson one assignment"},
    {id:2, title: "Practice Leetcode"},
    {id:3, title: "Do Laundry"},
    ];

const TodoList=()=>{
    return (
        <ul>
            {todoList.map(todo => (
            <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    )

}

export default TodoList