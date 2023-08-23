import { fireEvent, render, screen } from "@testing-library/react";
import Selector from "../Selector";
import renderer from "react-test-renderer";

const mockPlanetOptions = [
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

const mockVehicleOptions = [
  {
    name: "Space pod",
    total_no: 2,
    max_distance: 200,
    speed: 2,
  },
  {
    name: "Space rocket",
    total_no: 1,
    max_distance: 300,
    speed: 4,
  },
  {
    name: "Space shuttle",
    total_no: 1,
    max_distance: 400,
    speed: 5,
  },
  {
    name: "Space ship",
    total_no: 2,
    max_distance: 600,
    speed: 10,
  },
];

const mockPlanetDropdowns = [
  {
    isOpen: false,
    selectedPlanet: null,
    id: "d1",
    timeTaken: 0,
    filteredPlanetOptions: [],
  },
  {
    isOpen: false,
    selectedPlanet: null,
    id: "d2",
    timeTaken: 0,
    filteredPlanetOptions: [],
  },
  {
    isOpen: false,
    selectedPlanet: null,
    id: "d3",
    timeTaken: 0,
    filteredPlanetOptions: [],
  },
  {
    isOpen: false,
    selectedPlanet: null,
    id: "d4",
    timeTaken: 0,
    filteredPlanetOptions: [],
  },
];

const mockVehicleDropdowns = [
  {
    isOpen: false,
    currentSelectedVehicle: null,
    previousSelectedVehicle: null,
    id: "v1",
    associatedPlanetDropdown: "d1",
    selectedPlanet: null,
  },
  {
    isOpen: false,
    currentSelectedVehicle: null,
    previousSelectedVehicle: null,
    id: "v2",
    associatedPlanetDropdown: "d2",
    selectedPlanet: null,
  },
  {
    isOpen: false,
    currentSelectedVehicle: null,
    previousSelectedVehicle: null,
    id: "v3",
    associatedPlanetDropdown: "d3",
    selectedPlanet: null,
  },
  {
    isOpen: false,
    currentSelectedVehicle: null,
    previousSelectedVehicle: null,
    id: "v4",
    associatedPlanetDropdown: "d4",
    selectedPlanet: null,
  },
];

const mockHandlePlanetToggle = jest.fn();
const mockHandlePlanetSelection = jest.fn();
const mockHandleVehicleSelection = jest.fn();

const mockProps = {
  planetOptions: mockPlanetOptions,
  planetDropdowns: mockPlanetDropdowns,
  setPlanetDropdowns: jest.fn(),
  vehicleDropdowns: mockVehicleDropdowns,
  vehicleOptions: mockVehicleOptions,
  handlePlanetToggle: mockHandlePlanetToggle,
  handlePlanetSelection: mockHandlePlanetSelection,
  handleVehicleSelection: mockHandleVehicleSelection,
};

describe("Selector Component", () => {
  test("renders Selector without errors", () => {
    render(<Selector {...mockProps} />);
  });

  test("displays planet and vehicle dropdowns correctly", () => {
    render(<Selector {...mockProps} />);

    //Asserts that the rendered planet dropdowns are displayed correctly
    mockPlanetDropdowns.forEach((_, index) => {
      expect(screen.getByText(`Destination ${index + 1}`)).toBeInTheDocument();
    });
  });

  test("closes all open dropdowns when clicking outside", () => {
    const { container } = render(
      // Wraps the component with a div that is outside of the Selector component
      <div>
        <Selector {...mockProps} />
      </div>
    );

    // Simulates a click outside by clicking on the container div
    fireEvent.mouseDown(container);

    //Asserts that handlePlanetToggle has been called for each open dropdown
    setTimeout(() => {
      mockPlanetDropdowns.forEach((_, index) => {
        expect(mockHandlePlanetToggle).toHaveBeenCalledWith(
          index,
          mockPlanetDropdowns,
          mockProps.setPlanetDropdowns
        );
      });
    }, 0);
  });

  test("matches snapshot", () => {
    const component = renderer.create(<Selector {...mockProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
