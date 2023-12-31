import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Selector from "../../components/Selector/Selector";
import {
  handlePlanetToggle,
  updateAssociatedVehicleDropdown,
  updatePlanetDropdowns,
  calculateTimeTaken,
} from "../../helpers/home.utils";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import classes from "../../components/common/Button/button.module.css";
import Spinner from "../../components/common/Spinner/Spinner";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [planetOptions, setPlanetOptions] = useState([]);
  const [planetDropdowns, setPlanetDropdowns] = useState([
    {
      isOpen: false,
      selectedPlanet: null,
      id: "d1",
      timeTaken: 0,
      filteredPlanetOptions: [],
    },
    {
      isOpen: false,
      selectedPlanet: null,
      id: "d2",
      timeTaken: 0,
      filteredPlanetOptions: [],
    },
    {
      isOpen: false,
      selectedPlanet: null,
      id: "d3",
      timeTaken: 0,
      filteredPlanetOptions: [],
    },
    {
      isOpen: false,
      selectedPlanet: null,
      id: "d4",
      timeTaken: 0,
      filteredPlanetOptions: [],
    },
  ]);
  const [vehicleDropdowns, setVehicleDropdowns] = useState([
    {
      isOpen: false,
      currentSelectedVehicle: null,
      previousSelectedVehicle: null,
      id: "v1",
      associatedPlanetDropdown: "d1",
      selectedPlanet: null,
    },
    {
      isOpen: false,
      currentSelectedVehicle: null,
      previousSelectedVehicle: null,
      id: "v2",
      associatedPlanetDropdown: "d2",
      selectedPlanet: null,
    },
    {
      isOpen: false,
      currentSelectedVehicle: null,
      previousSelectedVehicle: null,
      id: "v3",
      associatedPlanetDropdown: "d3",
      selectedPlanet: null,
    },
    {
      isOpen: false,
      currentSelectedVehicle: null,
      previousSelectedVehicle: null,
      id: "v4",
      associatedPlanetDropdown: "d4",
      selectedPlanet: null,
    },
  ]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [vehicleNames, setVehicleNames] = useState([]);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);

  const [tokenErrorMessage, setTokenErrorMessage] = useState(null);
  const [planetNames, setPlanetNames] = useState([]);

  const navigate = useNavigate();

  const togglePlanet = (index) => {
    handlePlanetToggle(index, planetDropdowns, setPlanetDropdowns);
  };

  const handlePlanetSelection = (index, value) => {
    const { filteredDropdowns, updatedPlanetOptions } = updatePlanetDropdowns(
      planetDropdowns,
      index,
      value,
      planetOptions
    );

    setPlanetOptions(updatedPlanetOptions);
    setPlanetDropdowns(filteredDropdowns);

    const selectedPlanet = planetOptions.find(
      (planet) => planet.name === value.name
    );
    const associatedVehicleDropdown = vehicleDropdowns.find(
      (dropdown) => dropdown.associatedPlanetDropdown === `d${index + 1}`
    );

    const updatedVehicleDropdowns = updateAssociatedVehicleDropdown(
      selectedPlanet,
      associatedVehicleDropdown,
      vehicleDropdowns,
      vehicleOptions
    );

    setVehicleDropdowns(updatedVehicleDropdowns);

    const updatedPlanetNames = planetDropdowns.map(
      (dropdown) => dropdown.selectedPlanet?.name
    );
    setPlanetNames(updatedPlanetNames);
  };

  const handleVehicleSelection = (index, optionName) => {
    const associatedVehicleDropdown = vehicleDropdowns[index];

    // Stores the current selected vehicle
    const previousSelectedVehicle =
      associatedVehicleDropdown.currentSelectedVehicle;
    associatedVehicleDropdown.previousSelectedVehicle = previousSelectedVehicle;

    // Updates the current selected vehicle

    associatedVehicleDropdown.currentSelectedVehicle = optionName;

    // Updates the state with the modified vehicleDropdowns array

    setVehicleDropdowns([...vehicleDropdowns]);

    // Updates the used count for the previous and current selections

    if (previousSelectedVehicle !== null) {
      const prevSelectedVehicle = vehicleOptions.find(
        (vehicle) => vehicle.name === previousSelectedVehicle
      );
      prevSelectedVehicle.used -= 1;
    }

    const currentSelectedVehicle = vehicleOptions.find(
      (vehicle) => vehicle.name === optionName
    );
    currentSelectedVehicle.used += 1;

    // Calculates the time taken by each vehicle

    const selectedPlanet = associatedVehicleDropdown.selectedPlanet;

    const timeTaken = calculateTimeTaken(
      selectedPlanet,
      currentSelectedVehicle
    );

    const associatedPlanetDropdown = planetDropdowns.find(
      (dropdown) =>
        dropdown.id === vehicleDropdowns[index].associatedPlanetDropdown
    );

    const associatedPlanetIndex = planetDropdowns.findIndex(
      (dropdown) => dropdown.id === associatedPlanetDropdown.id
    );
    planetDropdowns[associatedPlanetIndex].timeTaken = timeTaken;
    setPlanetDropdowns([...planetDropdowns]);

    // Calculates the total time taken

    const updatedTotalTimeTaken = planetDropdowns.reduce(
      (totalTime, dropdown) => {
        return totalTime + dropdown.timeTaken;
      },
      0
    );

    setTotalTimeTaken(updatedTotalTimeTaken);

    const updatedVehicleNames = vehicleDropdowns.map(
      (dropdown) => dropdown.currentSelectedVehicle
    );
    setVehicleNames(updatedVehicleNames);
  };

  useEffect(() => {
    // Fetches planet options
    const fetchPlanets = fetch("https://findfalcone.geektrust.com/planets")
      .then((response) => response.json())
      .then((data) => {
        const planetsData = data.map((planet) => {
          return {
            name: planet.name,
            distance: planet.distance,
            selectedByDropDown: undefined,
          };
        });
        setPlanetOptions(planetsData);
      })
      .catch((error) => {
        console.log("Error fetching planets:", error);
        setTokenErrorMessage(
          "Failed to fetch planets. Please try again later."
        );
      });

    // Fetches vehicle options
    const fetchVehicles = fetch("https://findfalcone.geektrust.com/vehicles")
      .then((response) => response.json())
      .then((data) => {
        const vehiclesData = data.map((vehicle) => {
          return {
            name: vehicle.name,
            total: vehicle.total_no,
            maxDistance: vehicle.max_distance,
            speed: vehicle.speed,
            used: 0,
          };
        });
        setVehicleOptions(vehiclesData);
      })
      .catch((error) => {
        console.log("Error fetching vehicles:", error);
        setTokenErrorMessage(
          "Failed to fetch vehicles. Please try again later."
        );
      });

    Promise.all([fetchPlanets, fetchVehicles])
      .then(() => {
        // Both API calls are completed, so sets loading to false

        setLoading(false);
      })
      .catch((error) => {
        // Handles errors from either of the API calls

        console.log("Error fetching data:", error);
        setLoading(false); // In case of an error, still sets loading to false
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
        // Redirects to the Result component with the result in the URL
        navigate("/result", {
          state: {
            totalTimeTaken,
            foundPlanet,
            findResult: result,
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
        <div>
          <h4>Select planets you want to search in: </h4>

          {loading ? (
            <Spinner />
          ) : (
            <>
              {tokenErrorMessage ? (
                <div>
                  <p>{tokenErrorMessage}</p>
                </div>
              ) : (
                <>
                  {totalTimeTaken !== null && (
                    <p>Time Taken: {totalTimeTaken}</p>
                  )}

                  <Selector
                    vehicleDropdowns={vehicleDropdowns}
                    planetDropdowns={planetDropdowns}
                    handlePlanetToggle={togglePlanet}
                    planetOptions={planetOptions}
                    vehicleOptions={vehicleOptions}
                    handlePlanetSelection={handlePlanetSelection}
                    handleVehicleSelection={handleVehicleSelection}
                  />
                </>
              )}
            </>
          )}
          <Button
            onClick={handleFindFalcone}
            className={classes.button_home}
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
      </div>
      <Footer />
    </>
  );
}
