import React from 'react';

const todoList = [
  {id:1, title: "Complete lesson one assignment"},
  {id:2, title: "Practice Leetcode"},
  {id:3, title: "Do Laundry"},
];

function App() {
  return (
    <>
      <div>
      <h1>
        Todo List
      </h1>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      </div>  
    </>
  )
}

export default App
