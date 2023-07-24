// Utility function to get filtered planet options
const getFilteredPlanetOptions = (selectedPlanetName, planetOptions) => {
  return planetOptions.filter((planet) => planet.name !== selectedPlanetName);
};

// Utility function to update the planet dropdowns
export const updatePlanetDropdowns = (
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
export const getAssociatedVehicleDropdown = (index, vehicleDropdowns) => {
  return vehicleDropdowns.find(
    (dropdown) => dropdown.associatedPlanetDropdown === `d${index + 1}`
  );
};

// Utility function to filter vehicle options based on selected planet's distance
const filterVehicleOptions = (selectedPlanet, vehicleOptions) => {
  return vehicleOptions.filter(
    (option) =>
      option.total > 0 && option.maxDistance >= selectedPlanet.distance
  );
};

// Utility function to update the associated vehicle dropdown
export const updateAssociatedVehicleDropdown = (
  selectedPlanet,
  associatedVehicleDropdown,
  vehicleDropdowns,
  vehicleOptions
) => {
  if (associatedVehicleDropdown) {
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
  }

  return vehicleDropdowns;
};

// Helper function to reduce the total number of the selected vehicle
export const reduceSelectedVehicleTotal = (vehicleOptions, value) => {
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
