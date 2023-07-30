// Utility function to get filtered planet options
const getFilteredPlanetOptions = (selectedPlanetName, planetOptions) =>
  planetOptions.filter((planet) => planet.name !== selectedPlanetName);

// Utility function to update the planet dropdowns
const updatePlanetDropdowns = (
  updatedDropdowns,
  index,
  value,
  planetOptions
) => {
  updatedDropdowns[index].selected = value;
  updatedDropdowns[index].isOpen = false;

  const updatedPlanetOptions = planetOptions.filter(
    (planet) => planet.name !== value
  );
  const filteredDropdowns = updatedDropdowns.map((dropdown, dropdownIndex) => {
    if (dropdownIndex !== index) {
      const filteredOptions = getFilteredPlanetOptions(
        dropdown.selected?.name,
        updatedPlanetOptions
      );
      return {
        ...dropdown,
        filteredOptions: filteredOptions,
      };
    }
    return dropdown;
  });

  return { filteredDropdowns, updatedPlanetOptions };
};

// Utility function to get the associated vehicle dropdown
const getAssociatedVehicleDropdown = (index, vehicleDropdowns) =>
  vehicleDropdowns.find(
    (dropdown) => dropdown.associatedPlanetDropdown === `d${index + 1}`
  );

// Utility function to filter vehicle options based on selected planet's distance
const filterVehicleOptions = (selectedPlanet, vehicleOptions) =>
  vehicleOptions.filter(
    (option) =>
      option.total > 0 && option.maxDistance >= selectedPlanet.distance
  );

// Utility function to update the associated vehicle dropdown
const updateAssociatedVehicleDropdown = (
  selectedPlanet,
  associatedVehicleDropdown,
  vehicleDropdowns,
  vehicleOptions
) => {
  if (!associatedVehicleDropdown) {
    return vehicleDropdowns;
  }
  associatedVehicleDropdown.selectedPlanet = selectedPlanet;
  const filteredVehicleOptions = filterVehicleOptions(
    selectedPlanet,
    vehicleOptions
  );

  const updatedVehicleDropdowns = [...vehicleDropdowns];

  const associatedDropdownIndex = updatedVehicleDropdowns.findIndex(
    (dropdown) => dropdown.id === associatedVehicleDropdown.id
  );

  if (associatedDropdownIndex !== -1) {
    updatedVehicleDropdowns[associatedDropdownIndex] = {
      ...updatedVehicleDropdowns[associatedDropdownIndex],
      filteredVehicleOptions: filteredVehicleOptions,
    };
    updatedVehicleDropdowns[associatedDropdownIndex].isOpen = true;
  }

  return updatedVehicleDropdowns;
};

// Helper function to reduce the total number of the selected vehicle
const reduceSelectedVehicleTotal = (vehicleOptions, value) => {
  return vehicleOptions.map((option) => {
    if (option.name === value) {
      return {
        ...option,
        total: option.total - 1,
      };
    }
    return option;
  });
};

export const handlePlanetToggle = (
  index,
  planetDropdowns,
  setPlanetDropdowns
) => {
  const updatedDropdowns = [...planetDropdowns];
  updatedDropdowns[index].isOpen = !updatedDropdowns[index].isOpen;
  setPlanetDropdowns(updatedDropdowns);
};

export const handlePlanetSelection = (
  index,
  value,
  planetDropdowns,
  setPlanetDropdowns,
  planetOptions,
  setPlanetOptions,
  vehicleDropdowns,
  vehicleOptions,
  setVehicleDropdowns,
  setPlanetNames
) => {
  const updatedDropdowns = [...planetDropdowns];
  const { filteredDropdowns, updatedPlanetOptions } = updatePlanetDropdowns(
    updatedDropdowns,
    index,
    value,
    planetOptions
  );

  setPlanetOptions(updatedPlanetOptions);
  setPlanetDropdowns(filteredDropdowns);

  // Calculate distance of the selected planet
  const selectedPlanet = planetOptions.find((planet) => planet === value);
  const associatedVehicleDropdown = getAssociatedVehicleDropdown(
    index,
    vehicleDropdowns
  );

  const updatedVehicleDropdowns = updateAssociatedVehicleDropdown(
    selectedPlanet,
    associatedVehicleDropdown,
    vehicleDropdowns,
    vehicleOptions
  );

  setVehicleDropdowns(updatedVehicleDropdowns);

  const updatedPlanetNames = updatedDropdowns.map(
    (dropdown) => dropdown.selected?.name
  );
  setPlanetNames(updatedPlanetNames);
};

const calculateTimeTaken = (planet, vehicle) => {
  if (planet && vehicle) {
    return planet.distance / parseFloat(vehicle.speed);
  }
  return 0;
};

export const handleVehicleSelection = (
  index,
  value,
  vehicleDropdowns,
  vehicleOptions,
  setVehicleDropdowns,
  setVehicleOptions,
  planetDropdowns,
  setPlanetDropdowns,
  setTotalTimeTaken,
  setVehicleNames
) => {
  const updatedDropdowns = [...vehicleDropdowns];
  const selectedVehicle = vehicleOptions.find(
    (option) => option.name === value
  );

  updatedDropdowns[index].selected = selectedVehicle.name;
  setVehicleDropdowns(updatedDropdowns);

  const updatedVehicleOptions = reduceSelectedVehicleTotal(
    vehicleOptions,
    value
  );
  setVehicleOptions(updatedVehicleOptions);

  // Retrieve the selected planet object from the associated planet dropdown
  const associatedPlanetDropdown = planetDropdowns.find(
    (dropdown) =>
      dropdown.id === vehicleDropdowns[index].associatedPlanetDropdown
  );
  const selectedPlanet = associatedPlanetDropdown.selected;

  // Calculate time taken for the selected planet and vehicle combination
  const timeTaken = calculateTimeTaken(selectedPlanet, selectedVehicle);

  // Update the timeTaken property in the corresponding planet dropdown
  const updatedPlanetDropdowns = [...planetDropdowns];
  const associatedPlanetIndex = planetDropdowns.findIndex(
    (dropdown) => dropdown.id === associatedPlanetDropdown.id
  );
  updatedPlanetDropdowns[associatedPlanetIndex].timeTaken = timeTaken;
  setPlanetDropdowns(updatedPlanetDropdowns);

  // Update the total time taken
  const totalTime = planetDropdowns.reduce(
    (total, dropdown) => total + dropdown.timeTaken,
    0
  );
  setTotalTimeTaken(totalTime);

  const updatedvehicleNames = updatedDropdowns.map(
    (dropdown) => dropdown.selected
  );
  setVehicleNames(updatedvehicleNames);
};

