import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
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
            await new Promise((resolve) => setTimeout(resolve, 600));
        });

        const loadingMessageAfterLoading = screen.queryByText(/loading/i);
        expect(loadingMessageAfterLoading).not.toBeInTheDocument();

        const todoList = screen.queryByRole("list");
        expect(todoList).toBeInTheDocument();
    });
});
