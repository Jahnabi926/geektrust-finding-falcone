import {
  updatePlanetDropdowns,
  updateAssociatedVehicleDropdown,
  handlePlanetToggle,
  calculateTimeTaken,
} from "../home.utils";

describe("Utility Functions", () => {
  const planetOptions = [
    { name: "Donlon", distance: 100 },
    { name: "Enchai", distance: 200 },
    { name: "Sapir", distance: 300 },
    { name: "Pingasor", distance: 400 },
  ];

  const initialDropdowns = [
    { selectedPlanet: null, isOpen: false },
    { selectedPlanet: null, isOpen: false },
    { selectedPlanet: null, isOpen: false },
    { selectedPlanet: null, isOpen: false },
  ];

  test("updates planet dropdowns correctly", () => {
    const value = { name: "Enchai" };
    const updatedDropdowns = updatePlanetDropdowns(
      initialDropdowns,
      1,
      value,
      planetOptions
    );

    // Asserts the updated dropdowns and options
    expect(updatedDropdowns[1].selectedPlanet).toEqual(value);
    expect(updatedDropdowns[1].isOpen).toEqual(false);

    // Assert the selectedByDropDown property of planet options
    expect(
      updatedDropdowns[1].filteredPlanetOptions[1].selectedByDropDown
    ).toEqual("d2");

    expect(
      updatedDropdowns[0].filteredPlanetOptions[1].selectedByDropDown
    ).toBeUndefined();
  });

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

    // Assert the updated selected planet and isOpen property
    expect(updatedDropdowns[0].selectedPlanet).toEqual(selectedPlanet);
    expect(updatedDropdowns[0].isOpen).toEqual(true);
  });

  test("handles planet toggle correctly", () => {
    const initialDropdowns = [
      { isOpen: false },
      { isOpen: false },
      { isOpen: false },
      { isOpen: false },
    ];

    const updatedDropdowns = handlePlanetToggle(1, initialDropdowns);

    // Assert that the toggle for index 1 is now true
    expect(updatedDropdowns[1].isOpen).toEqual(true);

    // Assert that the toggle for other indices remains unchanged
    expect(updatedDropdowns[0].isOpen).toEqual(false);
    expect(updatedDropdowns[2].isOpen).toEqual(false);
    expect(updatedDropdowns[3].isOpen).toEqual(false);
  });

  test("calculates time taken correctly", () => {
    const planet = { name: "Donlon", distance: 200 };
    const vehicle = { name: "Space pod", speed: "2" };

    const timeTaken = calculateTimeTaken(planet, vehicle);

    // Assert the calculated time taken
    expect(timeTaken).toEqual(100); // 200 / 2 = 100
  });

  test("calculates time taken as 0 when planet or vehicle is missing", () => {
    const planet = { name: "Donlon", distance: 200 };
    const vehicle = null;

    const timeTaken = calculateTimeTaken(planet, vehicle);

    // Assert the calculated time taken as 0 when vehicle is missing
    expect(timeTaken).toEqual(0);

    const planetMissing = null;
    const vehicleMissing = { name: "Space pod", speed: "2" };

    const timeTakenMissing = calculateTimeTaken(planetMissing, vehicleMissing);

    // Assert the calculated time taken as 0 when planet is missing
    expect(timeTakenMissing).toEqual(0);
  });
});
