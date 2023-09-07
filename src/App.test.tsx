import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  test("Test content", () => {
    render(<App />);
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  test("create task", () => {
    render(<App />);
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "New Task" } });
    const addButton = screen.getByTestId("create-btn");
    fireEvent.click(addButton);
    const taskElement = screen.queryByText("New Task");
    expect(taskElement).toBeInTheDocument();
  });

  test("delete task", () => {
    render(<App />);
    const task = screen.getByText("New Task");
    expect(task).toBeInTheDocument();
    const deleteButton = screen.getByTestId("delete-btn");
    fireEvent.click(deleteButton);
    expect(task).not.toBeInTheDocument();
  });
});
