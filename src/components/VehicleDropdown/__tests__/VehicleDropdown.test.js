import { fireEvent, render, screen } from "@testing-library/react";
import VehicleDropdown from "../VehicleDropdown";
import renderer from "react-test-renderer";

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

const mockProps = {
  dropdown: {
    isOpen: true,
    selectedPlanet: {
      distance: 200,
    },
    currentVehicleSelection: "Space pod",
  },
  index: 0,
  vehicleOptions: mockVehicleOptions,
  handleVehicleSelection: jest.fn(),
};

describe("VehicleDropdown component", () => {
  test("renders VehicleDropdown without errors", () => {
    render(<VehicleDropdown {...mockProps} />);
  });

  test("displays vehicle options correctly", () => {
    render(<VehicleDropdown {...mockProps} />);

    //Asserts that the rendered vehicle options are displayed correctly
    mockVehicleOptions.forEach((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  test("calls handleVehicleSelection when a vehicle option is clicked", () => {
    render(<VehicleDropdown {...mockProps} />);

    const option = screen.getByText(mockVehicleOptions[0].name);
    fireEvent.click(option);

    expect(mockProps.handleVehicleSelection).toHaveBeenCalledWith(
      mockProps.index,
      mockVehicleOptions[0].name
    );
  });

  test("matches snapshot", () => {
    const component = renderer.create(<VehicleDropdown {...mockProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
