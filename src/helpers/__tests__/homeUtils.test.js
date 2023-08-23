import {
  updateAssociatedVehicleDropdown,
  calculateTimeTaken,
} from "../home.utils";

describe("Utility Functions", () => {
  test("updates associated vehicle dropdown correctly", () => {
    const selectedPlanet = { name: "Donlon" };
    const associatedDropdown = {
      id: "associated-vehicle-dropdown",
      selectedPlanet: null,
      isOpen: false,
    };
    const vehicleDropdowns = [associatedDropdown];

    const updatedDropdowns = updateAssociatedVehicleDropdown(
      selectedPlanet,
      associatedDropdown,
      vehicleDropdowns
    );

    // Asserts the updated selected planet and isOpen property
    expect(updatedDropdowns[0].selectedPlanet).toEqual(selectedPlanet);
    expect(updatedDropdowns[0].isOpen).toEqual(true);
  });

  test("calculates time taken correctly", () => {
    const planet = { name: "Donlon", distance: 200 };
    const vehicle = { name: "Space pod", speed: "2" };

    const timeTaken = calculateTimeTaken(planet, vehicle);

    // Asserts the calculated time taken
    expect(timeTaken).toEqual(100); // 200 / 2 = 100
  });

  test("calculates time taken as 0 when planet or vehicle is missing", () => {
    const planet = { name: "Donlon", distance: 200 };
    const vehicle = null;

    const timeTaken = calculateTimeTaken(planet, vehicle);

    // Asserts the calculated time taken as 0 when vehicle is missing
    expect(timeTaken).toEqual(0);

    const planetMissing = null;
    const vehicleMissing = { name: "Space pod", speed: "2" };

    const timeTakenMissing = calculateTimeTaken(planetMissing, vehicleMissing);

    // Asserts the calculated time taken as 0 when planet is missing
    expect(timeTakenMissing).toEqual(0);
  });
});
