import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Header Component", () => {
  test("renders without errors", () => {
    render(<Header />);
  });

  test("renders 'GeekTrust Home' link with the correct URL", () => {
    render(<Header />);
    const homeLink = screen.getByText("GeekTrust Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.href).toContain("/");
  });

  test("renders 'Reset' button and it's clickable", () => {
    render(<Header />);
    const resetButton = screen.getByText("Reset");
    expect(resetButton).toBeInTheDocument();

    // Check if the 'Reset' button is clickable
    fireEvent.click(resetButton);
  });

  test("clicking 'Reset' button calls handleReset function", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);

    render(<Header />);
    const resetButton = screen.getByText("Reset");

    fireEvent.click(resetButton);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
