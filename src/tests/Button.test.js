import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import Button from "../components/Button";

describe("Button Component", () => {
  // Test case 1: Render the button correctly
  it("should render the button with children", () => {
    const buttonText = "Click me!";
    render(<Button>{buttonText}</Button>);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  // Test case 2: Call the onClick handler when the button is clicked
  it("should call the onClick handler when the button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me!</Button>);
    const buttonElement = screen.getByText("Click me!");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  // Test case 3: Button should be disabled when 'disabled' prop is true
  it("should be disabled when 'disabled' prop is true", () => {
    render(<Button disabled>Click me!</Button>);
    const buttonElement = screen.getByText("Click me!");
    expect(buttonElement).toBeDisabled();
  });

  // Test case 4: Custom CSS class should be applied to the button
  it("should apply custom CSS class to the button", () => {
    const customClass = "custom-button";
    render(<Button className={customClass}>Click me!</Button>);
    const buttonElement = screen.getByText("Click me!");
    expect(buttonElement).toHaveClass(customClass);
  });
});
