import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
// import "./App.css";
import styles from "./App.module.css";

// const todoList = [
//     { id: 1, title: "Complete lesson one assignment" },
//     { id: 2, title: "Practice Leetcode" },
//     { id: 3, title: "Do Laundry" },
// ];

const apiURL = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get tasks from AirTable
    const fetchData = async () => {
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
            console.error(error);
            setIsLoading(false);
        }
    };

    // Post a task to Airtable
    const postTodo = async (todo) => {
        const airtableData = {
            fields: {
                title: todo.title,
            },
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    import.meta.env.VITE_AIRTABLE_API_TOKEN
                }`,
            },
            body: JSON.stringify(airtableData),
        };
        try {
            const response = await fetch(apiURL, options);

            if (!response.ok) {
                const message = `Error has ocurred: ${response.status}`;
                throw new Error(message);
            }

            const dataResponse = await response.json();
            return { id: dataResponse.id, title: dataResponse.fields.title };
        } catch (error) {
            console.error(error);
        }
    };

    // Delete from Airtable
    const deleteTodo = async (id) => {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    import.meta.env.VITE_AIRTABLE_API_TOKEN
                }`,
            },
        };
        try {
            const response = await fetch(`${apiURL}/${id}`, options);

            if (!response.ok) {
                const message = `Error has ocurred: ${response.status}`;
                throw new Error(message);
            } else {
                console.log("Task has been deleted successfully.");
            }
        } catch (error) {
            console.error(error);
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
            console.error(error);
        }
    };

    const removeTodo = async (id) => {
        try {
            await deleteTodo(id);
            const updateTodoList = todoList.filter((todo) => todo.id != id);
            setTodoList(updateTodoList);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <BrowserRouter>
            <div className={styles.container}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <h1 className={styles.headlinePrimary}>
                                    Todo List
                                </h1>
                                <AddTodoForm onAddTodo={addTodo} />
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <TodoList
                                        todoList={todoList}
                                        onRemoveTodo={removeTodo}
                                    />
                                )}
                            </>
                        }
                    />
                    <Route path="/new" element={<h1>New Todo List</h1>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
