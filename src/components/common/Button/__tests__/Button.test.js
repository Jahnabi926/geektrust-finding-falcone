import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  test("renders without errors", () => {
    render(<Button>Click Me</Button>);
  });

  test("displays the correct text", () => {
    const buttonText = "Click Me";
    render(<Button>{buttonText}</Button>);
    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  test("triggers onClick event", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("is disabled when disabled prop is true", () => {
    const onClickMock = jest.fn();
    render(
      <Button onClick={onClickMock} disabled={true}>
        Click Me
      </Button>
    );
    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
