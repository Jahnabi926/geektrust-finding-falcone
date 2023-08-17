import { render } from "@testing-library/react";
import PlanetDropdown from "../PlanetDropdown";

describe("PlanetDropdown Component", () => {
  const planetOptions = [
    {
      name: "Donlon",
      distance: 100,
    },
    {
      name: "Enchai",
      distance: 200,
    },
    {
      name: "Jebing",
      distance: 300,
    },
    {
      name: "Sapir",
      distance: 400,
    },
    {
      name: "Lerbin",
      distance: 500,
    },
    {
      name: "Pingasor",
      distance: 600,
    },
  ];

  const planetDropdowns = [
    { selectedPlanet: null, isOpen: false }, // Corrected: Set initial isOpen to false
    { selectedPlanet: null, isOpen: false }, // Corrected: Set initial isOpen to false
  ];

  const handlePlanetToggle = jest.fn();
  const handlePlanetSelection = jest.fn();

  test("renders without errors", () => {
    render(
      <PlanetDropdown
        dropdown={planetDropdowns[0]}
        index={0}
        planetOptions={planetOptions}
        planetDropdowns={planetDropdowns}
        handlePlanetToggle={handlePlanetToggle}
        handlePlanetSelection={handlePlanetSelection}
      />
    );
  });
});
