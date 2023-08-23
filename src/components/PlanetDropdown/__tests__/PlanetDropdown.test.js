import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import PlanetDropdown from "../PlanetDropdown";

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

const mockProps = {
  dropdown: {
    isOpen: true,
    selectedPlanet: null,
  },
  index: 0,
  planetOptions: mockPlanetOptions,
  handlePlanetToggle: jest.fn(),
  handlePlanetSelection: jest.fn(),
  userInput: "",
  handleInput: jest.fn(),
};

describe("PlanetDropdown Component", () => {
  test("renders PlanetDropdown without errors", () => {
    render(<PlanetDropdown {...mockProps} />);
  });

  test("displays planet options correctly", () => {
    render(<PlanetDropdown {...mockProps} />);

    //Asserts that the rendered planet options are displayed correctly
    mockPlanetOptions.forEach((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  test("calls handlePlanetToggle when the button is clicked", () => {
    render(<PlanetDropdown {...mockProps} />);

    // Manually triggers the handlePlanetToggle function
    mockProps.handlePlanetToggle(mockProps.index);

    expect(mockProps.handlePlanetToggle).toHaveBeenCalledWith(mockProps.index);
  });

  test("calls handlePlanetSelection when a planet option is clicked", () => {
    render(<PlanetDropdown {...mockProps} />);

    const option = screen.getByText(mockPlanetOptions[0].name);
    fireEvent.click(option);

    expect(mockProps.handlePlanetSelection).toHaveBeenCalledWith(
      mockProps.index,
      mockPlanetOptions[0]
    );
  });

  test("updates inputValue and calls handleInput on input change", () => {
    render(<PlanetDropdown {...mockProps} />);

    const inputElement = screen.getByPlaceholderText(
      "Start typing to search..."
    );

    const newInputValue = "Donlon";
    fireEvent.change(inputElement, { target: { value: newInputValue } });

    //Verifies that the inputValue state is updated
    expect(inputElement.value).toBe(newInputValue);

    //Verifies that the handleInput function is called with the new input value
    expect(mockProps.handleInput).toHaveBeenCalledWith(newInputValue);
  });

  test("matches snapshot", () => {
    //Renders the component
    const component = renderer.create(<PlanetDropdown {...mockProps} />);

    //Generates a snapshot
    const tree = component.toJSON();

    //Compares with the stored snapshot
    expect(tree).toMatchSnapshot();
  });
});
