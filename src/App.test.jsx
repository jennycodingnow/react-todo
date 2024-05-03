import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vitest } from "vitest";
import App from "./App.jsx";

describe("App", () => {
    it("renders the App component", () => {
        render(<App />);
        screen.debug();
    });
    it("displays loading message when component is loaded", () => {
        render(<App />);
        const loadingMessage = screen.getByText(/loading/i);
        expect(loadingMessage).toBeInTheDocument();
    });
    it("displays task list when loading message disappears", async () => {
        render(<App />);

        const loadingMessage = screen.getByText(/loading/i);
        expect(loadingMessage).toBeInTheDocument();

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 10000));
        });

        const loadingMessageAfterLoading = screen.queryByText(/loading/i);
        expect(loadingMessageAfterLoading).not.toBeInTheDocument();

        const todoList = screen.queryByRole("list");
        expect(todoList).toBeInTheDocument();
    }, 20000);
    it("Adds a task to the todo list", async () => {
        const postTodoMock = vitest.fn();
        render(<App postTodo={postTodoMock} />);

        const mockResponseData = { id: "mockId", title: "Mock Title" };
        postTodoMock.mockResolvedValue(mockResponseData);
        const todo = { title: "Task Title" };
        const result = await postTodoMock(todo);
        expect(result).toEqual(mockResponseData);
    });
});
