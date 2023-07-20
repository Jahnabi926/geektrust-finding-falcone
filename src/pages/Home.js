import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import VehicleChecklist from "../components/VehicleChecklist";

export default function Home() {
  const [planetOptions, setPlanetOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [planetDropdowns, setPlanetDropdowns] = useState([
    {
      isOpen: false,
      selected: null,
      id: "d1",
      timeTaken: 0,
      filteredOptions: [],
    },
    {
      isOpen: false,
      selected: null,
      id: "d2",
      timeTaken: 0,
      filteredOptions: [],
    },
    {
      isOpen: false,
      selected: null,
      id: "d3",
      timeTaken: 0,
      filteredOptions: [],
    },
    {
      isOpen: false,
      selected: null,
      id: "d4",
      timeTaken: 0,
      filteredOptions: [],
    },
  ]);
  const [vehicleDropdowns, setVehicleDropdowns] = useState([
    {
      isOpen: false,
      selected: null,
      id: "v1",
      associatedPlanetDropdown: "d1",
      selectedPlanet: null,
      filteredVehicleOptions: [],
    },
    {
      isOpen: false,
      selected: null,
      id: "v2",
      associatedPlanetDropdown: "d2",
      selectedPlanet: null,
      filteredVehicleOptions: [],
    },
    {
      isOpen: false,
      selected: null,
      id: "v3",
      associatedPlanetDropdown: "d3",
      selectedPlanet: null,
      filteredVehicleOptions: [],
    },
    {
      isOpen: false,
      selected: null,
      id: "v4",
      associatedPlanetDropdown: "d4",
      selectedPlanet: null,
      filteredVehicleOptions: [],
    },
  ]);
  const [tokenErrorMessage, setTokenErrorMessage] = useState(null);
  const [planetNames, setPlanetNames] = useState([]);
  const [vehicleNames, setVehicleNames] = useState([]);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);

  const navigate = useNavigate();
  const handlePlanetToggle = (index) => {
    const updatedDropdowns = [...planetDropdowns];
    updatedDropdowns[index].isOpen = !updatedDropdowns[index].isOpen;
    setPlanetDropdowns(updatedDropdowns);
  };
  const filterPlanetOptions = (selectedPlanet, allOptions) => {
    if (!selectedPlanet) {
      return allOptions;
    }
    return allOptions.filter((planet) => planet.name !== selectedPlanet.name);
  };
  const updateFilteredDropdowns = (
    index,
    selectedPlanet,
    planetDropdowns,
    planetOptions
  ) => {
    return planetDropdowns.map((dropdown, dropdownIndex) => {
      if (dropdownIndex !== index) {
        const filteredOptions = dropdown.selected
          ? filterPlanetOptions(selectedPlanet, planetOptions)
          : planetOptions;
        return {
          ...dropdown,
          filteredOptions: filteredOptions,
        };
      }
      return dropdown;
    });
  };
  const updateAssociatedVehicleDropdown = (
    index,
    selectedPlanet,
    vehicleDropdowns,
    vehicleOptions
  ) => {
    return vehicleDropdowns.map((dropdown) => {
      if (dropdown.associatedPlanetDropdown === `d${index + 1}`) {
        const filteredVehicleOptions = vehicleOptions.filter((option) => {
          const isOptionValid =
            option.total > 0 &&
            (!selectedPlanet || option.maxDistance >= selectedPlanet.distance);
          return isOptionValid;
        });

        return {
          ...dropdown,
          filteredVehicleOptions: filteredVehicleOptions,
          isOpen: true,
        };
      }
      return dropdown;
    });
  };
  const handlePlanetSelection = (index, value) => {
    setPlanetDropdowns((prevPlanetDropdowns) => {
      const updatedDropdowns = [...prevPlanetDropdowns];
      updatedDropdowns[index].selected = value;
      updatedDropdowns[index].isOpen = false;

      // Get the selected planet from the updatedDropdowns
      const selectedPlanet = updatedDropdowns[index].filteredOptions.find(
        (planet) => planet.name === value
      );

      const filteredDropdowns = updateFilteredDropdowns(
        index,
        selectedPlanet,
        updatedDropdowns,
        planetOptions
      );

      const updatedVehicleDropdowns = updateAssociatedVehicleDropdown(
        index,
        selectedPlanet,
        vehicleDropdowns,
        vehicleOptions
      );

      setVehicleDropdowns(updatedVehicleDropdowns);

      const updatedPlanetNames = updatedDropdowns.map(
        (dropdown) => dropdown.selected?.name
      );
      setPlanetNames(updatedPlanetNames);

      return filteredDropdowns;
    });
  };

  const calculateTimeTaken = (planet, vehicle) => {
    if (planet && vehicle) {
      return planet.distance / parseFloat(vehicle.speed);
    }
    return 0;
  };

  const updateVehicleDropdowns = (
    index,
    value,
    vehicleDropdowns,
    vehicleOptions
  ) => {
    const updatedDropdowns = [...vehicleDropdowns];
    const selectedVehicle = vehicleOptions.find(
      (option) => option.name === value
    );

    updatedDropdowns[index].selected = selectedVehicle.name;

    // Reduce the total number of the selected vehicle
    const updatedVehicleOptions = vehicleOptions.map((option) => {
      if (option.name === value) {
        return {
          ...option,
          total: option.total - 1,
        };
      }
      return option;
    });

    return { updatedDropdowns, updatedVehicleOptions };
  };

  const updatePlanetDropdowns = (
    index,
    selectedPlanet,
    planetDropdowns,
    vehicleDropdowns,
    timeTaken
  ) => {
    const updatedPlanetDropdowns = [...planetDropdowns];
    const selectedPlanetDropdown = planetDropdowns.find(
      (dropdown) =>
        dropdown.id === vehicleDropdowns[index].associatedPlanetDropdown
    );

    const associatedPlanetIndex = planetDropdowns.findIndex(
      (dropdown) => dropdown.id === selectedPlanetDropdown.id
    );

    updatedPlanetDropdowns[associatedPlanetIndex].timeTaken = timeTaken;

    return updatedPlanetDropdowns;
  };

  const calculateTotalTimeTaken = (planetDropdowns) => {
    const totalTime = planetDropdowns.reduce(
      (total, dropdown) => total + dropdown.timeTaken,
      0
    );

    return totalTime;
  };

  const handleVehicleSelection = (index, value) => {
    const { updatedDropdowns, updatedVehicleOptions } = updateVehicleDropdowns(
      index,
      value,
      vehicleDropdowns,
      vehicleOptions
    );

    setVehicleDropdowns(updatedDropdowns);
    setVehicleOptions(updatedVehicleOptions);

    const selectedVehicle = updatedDropdowns[index].selected;
    const selectedPlanetDropdown = planetDropdowns.find(
      (dropdown) =>
        dropdown.id === vehicleDropdowns[index].associatedPlanetDropdown
    );
    const selectedPlanet = selectedPlanetDropdown.selected;

    // Calculate time taken for the selected planet and vehicle combination
    const timeTaken = calculateTimeTaken(selectedPlanet, selectedVehicle);
    // Update the timeTaken property in the corresponding planet dropdown
    const updatedPlanetDropdowns = updatePlanetDropdowns(
      index,
      selectedPlanet,
      planetDropdowns,
      timeTaken
    );

    setPlanetDropdowns(updatedPlanetDropdowns);

    // Calculate the total time taken directly using updatedPlanetDropdowns
    const totalTimeTaken = calculateTotalTimeTaken(updatedPlanetDropdowns);
    setTotalTimeTaken(totalTimeTaken);

    const updatedVehicleNames = updatedDropdowns.map(
      (dropdown) => dropdown.selected
    );
    setVehicleNames(updatedVehicleNames);
  };

  useEffect(() => {
    // Fetch planet options
    fetch("https://findfalcone.geektrust.com/planets")
      .then((response) => response.json())
      .then((data) => {
        const planetsData = data.map((planet) => {
          return {
            name: planet.name,
            distance: planet.distance,
          };
        });
        setPlanetOptions(planetsData);
      })
      .catch((error) => console.log(error));

    // Fetch vehicle options

    fetch("https://findfalcone.geektrust.com/vehicles")
      .then((response) => response.json())
      .then((data) => {
        const vehiclesData = data.map((vehicle) => {
          return {
            name: vehicle.name,
            total: vehicle.total_no,
            maxDistance: vehicle.max_distance,
            speed: vehicle.speed,
          };
        });
        setVehicleOptions(vehiclesData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFindFalcone = () => {
    let foundPlanet;
    let token;
    let requestData;

    fetch("https://findfalcone.geektrust.com/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        token = data.token;
        requestData = {
          token,
          planet_names: planetNames,
          vehicle_names: vehicleNames,
        };
        return fetch("https://findfalcone.geektrust.com/find", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        foundPlanet = data.planet_name;

        const result =
          data.status === "success" ? data.planet_name : "AI Falcone not found";
        // Redirect to the Result component with the result in the URL
        navigate("/result", {
          state: {
            totalTimeTaken,
            foundPlanet,
            result,
          },
        });
      })

      .catch((error) => {
        const errorMessage =
          "Token not initialized. Please get a new token with /token API.";
        setTokenErrorMessage(errorMessage);
      });
  };
  return (
    <div className="App">
      <h1>Finding Falcone !</h1>
      <h4>Select planets you want to search in: </h4>

      {totalTimeTaken !== null && <p>Time Taken: {totalTimeTaken}</p>}

      <Dropdown
        planetDropdowns={planetDropdowns}
        handlePlanetToggle={handlePlanetToggle}
        planetOptions={planetOptions}
        handlePlanetSelection={handlePlanetSelection}
        filterPlanetOptions={filterPlanetOptions}
        updateFilteredDropdowns={updateFilteredDropdowns}
        updateAssociatedVehicleDropdown={updateAssociatedVehicleDropdown}
      />
      <VehicleChecklist
        vehicleDropdowns={vehicleDropdowns}
        handleVehicleSelection={handleVehicleSelection}
      />
      <div className="button-container">
        <Button
          onClick={handleFindFalcone}
          disabled={
            planetNames.length < 4 ||
            vehicleNames.length < 4 ||
            planetNames.includes(null) ||
            vehicleNames.includes(null)
          }
        >
          Find Falcone!
        </Button>
      </div>
      {tokenErrorMessage && (
        <div className="error-container">
          <p>{tokenErrorMessage}</p>
        </div>
      )}
    </div>
  );
}

// TODO: create a component for all the dropdowns, buttons
