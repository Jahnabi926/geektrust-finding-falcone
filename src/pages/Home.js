import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Selector from "../components/Selector";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [planetOptions, setPlanetOptions] = useState([]);
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
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehicleNames, setVehicleNames] = useState([]);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);

  const [tokenErrorMessage, setTokenErrorMessage] = useState(null);
  const [planetNames, setPlanetNames] = useState([]);

  const navigate = useNavigate();
  const handlePlanetToggle = (index) => {
    const updatedDropdowns = [...planetDropdowns];
    updatedDropdowns[index].isOpen = !updatedDropdowns[index].isOpen;
    setPlanetDropdowns(updatedDropdowns);
  };

  const handlePlanetSelection = (index, value) => {
    const updatedDropdowns = [...planetDropdowns];
    updatedDropdowns[index].selected = value;
    updatedDropdowns[index].isOpen = false;

    const updatedPlanetOptions = planetOptions.filter(
      (planet) => planet.name !== value
    );

    // Update the rest of the dropdowns with filtered options
    const filteredDropdowns = updatedDropdowns.map(
      (dropdown, dropdownIndex) => {
        if (dropdownIndex !== index) {
          const filteredOptions = dropdown.selected
            ? updatedPlanetOptions.filter(
                (planet) => planet.name !== dropdown.selected.name
              )
            : updatedPlanetOptions;
          return {
            ...dropdown,
            filteredOptions: filteredOptions,
          };
        }
        return dropdown;
      }
    );

    setPlanetOptions(updatedPlanetOptions);
    setPlanetDropdowns(filteredDropdowns);
    // Calculate distance of the selected planet
    const selectedPlanet = planetOptions.find((planet) => planet === value);
    const associatedVehicleDropdown = vehicleDropdowns.find(
      (dropdown) => dropdown.associatedPlanetDropdown === `d${index + 1}`
    );
    if (associatedVehicleDropdown) {
      associatedVehicleDropdown.selectedPlanet = selectedPlanet;
      // Filter vehicle options based on selected planet's distance
      const filteredVehicleOptions = vehicleOptions.filter((option) => {
        const isOptionValid =
          option.total > 0 && option.maxDistance >= selectedPlanet.distance;

        return isOptionValid;
      });

      const updatedVehicleDropdowns = [...vehicleDropdowns];

      // Find the index of the associated dropdown

      const associatedDropdownIndex = updatedVehicleDropdowns.findIndex(
        (dropdown) => dropdown.id === associatedVehicleDropdown.id
      );

      // Update the associated dropdown with the new filtered options

      if (associatedDropdownIndex !== -1) {
        updatedVehicleDropdowns[associatedDropdownIndex] = {
          ...updatedVehicleDropdowns[associatedDropdownIndex],
          filteredVehicleOptions: filteredVehicleOptions,
        };
        updatedVehicleDropdowns[associatedDropdownIndex].isOpen = true;
      }

      setVehicleDropdowns(updatedVehicleDropdowns);
    }

    const updatedPlanetNames = updatedDropdowns.map(
      (dropdown) => dropdown.selected?.name
    );
    setPlanetNames(updatedPlanetNames);
  };

  const handleVehicleSelection = (index, value) => {
    const updatedDropdowns = [...vehicleDropdowns];
    const selectedVehicle = vehicleOptions.find(
      (option) => option.name === value
    );

    updatedDropdowns[index].selected = selectedVehicle.name;
    setVehicleDropdowns(updatedDropdowns);

    //Reduce the total number of the selected vehicle
    const updatedVehicleOptions = vehicleOptions.map((option) => {
      if (option.name === value) {
        return {
          ...option,
          total: option.total - 1,
        };
      }
      return option;
    });
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
  const calculateTimeTaken = (planet, vehicle) => {
    if (planet && vehicle) {
      return planet.distance / parseFloat(vehicle.speed);
    }
    return 0;
  };

  useEffect(() => {
    // Fetch planet options
    const fetchPlanets = fetch("https://findfalcone.geektrust.com/planets")
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

    const fetchVehicles = fetch("https://findfalcone.geektrust.com/vehicles")
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

    Promise.all([fetchPlanets, fetchVehicles])
      .then(() => {
        // Both API calls are completed, so set loading to false

        setLoading(false);
      })
      .catch((error) => {
        // Handle errors from either of the API calls

        console.log("Error fetching data:", error);
        setLoading(false); // In case of an error, still set loading to false
      });
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Selector
          vehicleDropdowns={vehicleDropdowns}
          planetDropdowns={planetDropdowns}
          handlePlanetToggle={handlePlanetToggle}
          planetOptions={planetOptions}
          handlePlanetSelection={handlePlanetSelection}
          handleVehicleSelection={handleVehicleSelection}
        />
      )}
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
