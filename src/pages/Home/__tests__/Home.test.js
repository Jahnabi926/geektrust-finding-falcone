import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";

// Mock useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home Component", () => {
  test("renders Home component", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test("disables Find Falcone button when selections are not made", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    // Makes sure the "Find Falcone" button is initially disabled
    const findButton = screen.getByText("Find Falcone!");
    expect(findButton).toBeDisabled();
  });

  test("matches snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
