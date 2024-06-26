import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AboutMe from "./routes/AboutMe";
import "./App.css"

// const todoList = [
//     { id: 1, title: "Complete lesson one assignment" },
//     { id: 2, title: "Practice Leetcode" },
//     { id: 3, title: "Do Laundry" },
// ];

const apiURL = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sortAsc, setSortAsc] = useState<boolean>(true);

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
            const data: TodoItemResponse = await response.json();

            data.records.sort((objectA:TodoRecord, objectB:TodoRecord) => {
                const titleA = objectA.fields.title.toLowerCase();
                const titleB = objectB.fields.title.toLowerCase();

                if (titleA < titleB) return sortAsc ? -1 : 1;
                if (titleA > titleB) return sortAsc ? 1 : -1;
                return 0;
            });

            const todos: TodoItem[] = data.records.map((todo: TodoRecord) => ({
                    id: todo.id,
                    title: todo.fields.title,
            }));
            setTodoList(todos);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    // Post a task to Airtable
    const postTodo = async (todo: TodoItem): Promise<TodoItem | null> => {
        const airtableData: TodoItemRequest = {
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
        return null;
    };

    // Delete from Airtable
    const deleteTodo = async (id: number) => {
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
        }
    };

    useEffect(() => {
        fetchData();
    }, [sortAsc]);

    const toggleSortOrder = () => {
        setSortAsc((prevSortAsc) => !prevSortAsc);
    };

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("savedTodoList", JSON.stringify(todoList));
        }
    }, [todoList, isLoading]);

    const addTodo = async (todo: TodoItem) => {
        try {
            const data = await postTodo(todo);
            if (data == null) {
                return;
            }
            setTodoList([...todoList, data]);
        } catch (error) {
            console.error(error);
        }
    };

    const removeTodo = async (id: number) => {
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
            <NavBar />
            <div className="appContainer">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div className="headingContainer">
                                    <h1 className="headlinePrimary">
                                        Todo List
                                    </h1>
                                    <FaRegCalendarAlt
                                        className="calendarIcon"
                                    />
                                </div>
                                <AddTodoForm onAddTodo={addTodo} />
                                <div className="sortingButtonContainer">
                                    <button className="toggleIcon" onClick ={toggleSortOrder}>
                                        {sortAsc ? <TbArrowsSort /> : <TbArrowsSort />}
                                    </button>
                                </div>
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
                    <Route path="/aboutme" element={<AboutMe />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
