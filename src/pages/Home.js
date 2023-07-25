import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Selector from "../components/Selector";
import {
  updatePlanetDropdowns,
  getAssociatedVehicleDropdown,
  updateAssociatedVehicleDropdown,
  reduceSelectedVehicleTotal,
} from "../helpers/HomeUtilityFunctions";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

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

  const handleVehicleSelection = (index, value) => {
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
    <>
      <Header />
      <div className="App">
        <div className="home">
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
              className="button"
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
      </div>
      <Footer />
    </>
  );
}
