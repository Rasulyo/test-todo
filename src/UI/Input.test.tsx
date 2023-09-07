import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./Input";

describe("App Component", () => {
  test("Test content", () => {
    const onChangeMock = jest.fn();
    const value = "";

    render(<Input onChange={onChangeMock} value={value} />);

    const inputElement = screen.getByTestId("input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(value);
  });

  test("create task", () => {
    const onChangeMock = jest.fn();
    const value = "";
    render(<Input onChange={onChangeMock} value={value} />);
    const inputElement = screen.getByTestId("input");
    fireEvent.change(inputElement, { target: { value: "Новая задача" } });
    expect(onChangeMock).toHaveBeenCalledWith("Новая задача");
  });
});
