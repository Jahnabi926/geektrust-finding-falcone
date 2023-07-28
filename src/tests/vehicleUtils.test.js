import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; 
import {
  renderVehicleOptions,
  renderVehicleDropdown,
} from "../helpers/VehicleUtilityFunctions";

test("renders vehicle options correctly", () => {
  const dropdown = {
    filteredVehicleOptions: [
      { name: "Space pod", total: 2 },
      { name: "Space rocket", total: 1 },
      { name: "Space shuttle", total: 1 },
      { name: "Space ship", total: 2 },
    ],
    selected: "Space pod",
  };
  const handleVehicleSelection = jest.fn();
  const index = 0;

  render(renderVehicleOptions(dropdown, index, handleVehicleSelection));

  // Verify that all vehicle options are rendered
  const option1Label = screen.getByText("Space pod");
  const option2Label = screen.getByText("Space rocket");
  const option3Label = screen.getByText("Space shuttle");
  const option4Label = screen.getByText("Space ship");

  expect(option1Label).toBeInTheDocument();
  expect(option2Label).toBeInTheDocument();
  expect(option3Label).toBeInTheDocument();
  expect(option4Label).toBeInTheDocument();

  // Verify that the selected option is checked
  const option1Input = screen.getByLabelText("Space pod");
  const option2Input = screen.getByLabelText("Space rocket");
  const option3Input = screen.getByLabelText("Space shuttle");
  const option4Input = screen.getByLabelText("Space ship");

  expect(option1Input).toBeChecked();
  expect(option2Input).not.toBeChecked();
  expect(option3Input).not.toBeChecked();
  expect(option4Input).not.toBeChecked();

  userEvent.click(option1Input);

  expect(option1Input).toBeChecked();
  expect(option2Input).not.toBeChecked();
  expect(option3Input).not.toBeChecked();
  expect(option4Input).not.toBeChecked();
});

test("calls handleVehicleSelection when a vehicle option is selected", () => {
  // Test implementation...
});

test("disables options with total zero", () => {
  // Test implementation...
});

test("renders vehicle dropdown when isOpen is true", () => {
  // Test implementation...
});

test("does not render vehicle dropdown when isOpen is false", () => {
  // Test implementation...
});
