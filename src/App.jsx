import { useEffect, useState } from "react";
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
    const [isLoading, setIsLoading] = useState(true);

    // Get tasks from AirTable
    const fetchData = async () => {
        const apiURL = `https://api.airtable.com/v0/${
            import.meta.env.VITE_AIRTABLE_BASE_ID
        }/${import.meta.env.VITE_TABLE_NAME}`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${
                    import.meta.env.VITE_AIRTABLE_API_TOKEN
                }`,
            },
        };
        try {
            const response = await fetch(apiURL, options);

            if (!response.ok) {
                const message = `Error has ocurred: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();
            const todos = data.records.map((todo) => {
                const newTodo = {
                    id: todo.id,
                    title: todo.fields.title,
                };
                return newTodo;
            });
            setTodoList(todos);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };

    // Post a task to Airtable
    const postTodo = async (todo) => {
        try {
            const airtableData = {
                fields: {
                    title: todo.title,
                },
            };

            const response = await fetch(
                `https://api.airtable.com/v0/${
                    import.meta.env.VITE_AIRTABLE_BASE_ID
                }/Default`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            import.meta.env.VITE_AIRTABLE_API_TOKEN
                        }`,
                    },
                    body: JSON.stringify(airtableData),
                }
            );

            if (!response.ok) {
                const message = `Error has ocurred: ${response.status}`;
                throw new Error(message);
            }

            const dataResponse = await response.json();
            console.log(dataResponse);
            // return dataResponse;
            return { id: dataResponse.id, title: dataResponse.fields.title };
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };

    // Delete from Airtable
    const postDeleteTodo = async (id) => {
        try {
            const response = await fetch(
                `https://api.airtable.com/v0/${
                    import.meta.env.VITE_AIRTABLE_BASE_ID
                }/Default/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            import.meta.env.VITE_AIRTABLE_API_TOKEN
                        }`,
                    },
                }
            );

            if (!response.ok) {
                const message = `Error has ocurred: ${response.status}`;
                throw new Error(message);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error.message);
            return null;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("savedTodoList", JSON.stringify(todoList));
        }
    }, [todoList, isLoading]);

    const addTodo = async (todo) => {
        try {
            const data = await postTodo(todo);
            setTodoList([...todoList, data]);
        } catch (error) {
            console.error(error.message);
        }
    };

    const removeTodo = async (id) => {
        try {
            await postDeleteTodo(id);
            const updateTodoList = todoList.filter((todo) => todo.id != id);
            setTodoList(updateTodoList);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
        </>
    );
}

export default App;
