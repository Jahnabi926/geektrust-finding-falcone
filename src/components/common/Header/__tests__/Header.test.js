import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

describe("Header Component", () => {
  it("renders the component correctly", () => {
    render(<Header />, { wrapper: MemoryRouter });

    const headerTitle = screen.getByText("Finding Falcone !");
    const homeLink = screen.getByText("GeekTrust Home");
    const resetButton = screen.getByText("Reset");

    expect(headerTitle).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });
});
