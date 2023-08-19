// Utility function to update the planet dropdowns
export const updatePlanetDropdowns = (
  planetDropdowns,
  index,
  value,
  planetOptions
) => {
  planetDropdowns[index].selectedPlanet = value;
  planetDropdowns[index].isOpen = false;

  const updatedPlanetOptions = planetOptions.map((planet) => {
    // removes the association of a planet with a specific dropdown when the user changes their selection
    // in that dropdown.
    if (
      planet.selectedByDropDown &&
      planet.selectedByDropDown === `d${index + 1}`
    ) {
      return {
        ...planet,
        selectedByDropDown: undefined,
      };
    }

    if (planet.name === value.name) {
      return {
        ...planet,
        selectedByDropDown: `d${index + 1}`,
      };
    }

    return planet;
  });

  const filteredDropdowns = planetDropdowns.map((dropdown, dropdownIndex) => {
    if (dropdownIndex !== index) {
      const filteredPlanetOptions = updatedPlanetOptions;
      return {
        ...dropdown,
        filteredPlanetOptions: filteredPlanetOptions,
      };
    }
    return {
      ...dropdown,
      selectedPlanet: value,
      filteredPlanetOptions: updatedPlanetOptions,
    };
  });

  return { filteredDropdowns, updatedPlanetOptions };
};

// Utility function to update the associated vehicle dropdown
export const updateAssociatedVehicleDropdown = (
  selectedPlanet,
  associatedVehicleDropdown,
  vehicleDropdowns
) => {
  if (!associatedVehicleDropdown) {
    return vehicleDropdowns;
  }

  // Create a new object rather than mutating the existing one
  const updatedVehicleDropdown = {
    ...associatedVehicleDropdown,
    selectedPlanet: selectedPlanet,
  };

  // Find the index of the associated vehicle dropdown in the updated list
  const associatedDropdownIndex = vehicleDropdowns.findIndex(
    (dropdown) => dropdown.id === associatedVehicleDropdown.id
  );

  // Create a copy of the vehicle dropdowns list and update the relevant dropdown
  const updatedVehicleDropdowns = [...vehicleDropdowns];
  updatedVehicleDropdowns[associatedDropdownIndex] = updatedVehicleDropdown;

  // Set isOpen to true so the filtered options will be shown immediately
  updatedVehicleDropdowns[associatedDropdownIndex].isOpen = true;

  return updatedVehicleDropdowns;
};

export const handlePlanetToggle = (
  index,
  planetDropdowns,
  setPlanetDropdowns
) => {
  const updatedDropdowns = planetDropdowns.map((dropdown, i) => {
    if (i === index) {
      return { ...dropdown, isOpen: !dropdown.isOpen };
    }
    return dropdown;
  });

  setPlanetDropdowns(updatedDropdowns);
};

export const calculateTimeTaken = (planet, vehicle) => {
  if (planet && vehicle) {
    return planet.distance / parseFloat(vehicle.speed);
  }
  return 0;
};
