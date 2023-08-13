// Utility function to update the planet dropdowns
export const updatePlanetDropdowns = (
  updatedDropdowns,
  index,
  value,
  planetOptions
) => {
  updatedDropdowns[index].selected = value;
  updatedDropdowns[index].isOpen = false;
  console.log("value", value);
  console.log("planetOptions", planetOptions);

  const updatedPlanetOptions = planetOptions.map((planet) => {
    // remove if a selection was made for a same dropdown
    if (
      planet.selectedByDropDown &&
      planet.selectedByDropDown === `d${index}`
    ) {
      return {
        ...planet,
        selectedByDropDown: undefined,
      };
    }

    if (planet.name === value.name) {
      return {
        ...planet,
        selectedByDropDown: `d${index}`,
      };
    }

    return planet;
  });

  console.log("updatedPlanetOptions", updatedPlanetOptions);
  const filteredDropdowns = updatedDropdowns.map((dropdown, dropdownIndex) => {
    if (dropdownIndex !== index) {
      const filteredOptions = updatedPlanetOptions;
      return {
        ...dropdown,
        filteredOptions: filteredOptions,
      };
    }
    return {
      ...dropdown,
      selected: value,
      filteredOptions: updatedPlanetOptions,
    };
  });

  return { filteredDropdowns, updatedPlanetOptions };
};

// Utility function to get the associated vehicle dropdown
export const getAssociatedVehicleDropdown = (index, vehicleDropdowns) =>
  vehicleDropdowns.find(
    (dropdown) => dropdown.associatedPlanetDropdown === `d${index + 1}`
  );

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
  const updatedDropdowns = [...planetDropdowns];
  updatedDropdowns[index].isOpen = !updatedDropdowns[index].isOpen;
  setPlanetDropdowns(updatedDropdowns);
};

export const calculateTimeTaken = (planet, vehicle) => {
  if (planet && vehicle) {
    return planet.distance / parseFloat(vehicle.speed);
  }
  return 0;
};
