import { render, screen, fireEvent } from "@testing-library/react";
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

  test("enables Find Falcone button when all selections are made", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    const planetDropdownCount = 4;

    // Simulates selecting planets
    for (let index = 0; index < planetDropdownCount; index++) {
      const planetDropdown = screen.getByRole("button", {
        name: /Select an option/i,
      });

      fireEvent.click(planetDropdown); // Opens the planet dropdown

      // Selects planet option based on index
      const planetOption = screen.getByText(/^(Donlon|Enchai|Sapir|Pingasor)$/);
      fireEvent.click(planetOption);
    }

    // Simulates selecting vehicles
    const vehicleRadioButtons = screen.getAllByRole("radio");
    const vehicleNames = [
      "Space pod",
      "Space rocket",
      "Space shuttle",
      "Space ship",
    ];

    vehicleRadioButtons.forEach((radioButton, index) => {
      fireEvent.click(radioButton);
      const vehicleOption = screen.getByText(vehicleNames[index]);
      fireEvent.click(vehicleOption);
    });

    // Now the "Find Falcone" button should be enabled
    const findButton = screen.getByText("Find Falcone!");
    expect(findButton).not.toBeDisabled();
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
