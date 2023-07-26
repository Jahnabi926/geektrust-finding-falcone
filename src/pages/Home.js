import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Selector from "../components/Selector";
import {
  handlePlanetToggle,
  handlePlanetSelection,
  handleVehicleSelection,
  handleFindFalcone,
} from "../helpers/HomeUtilityFunctions";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import styles from "../styles/selector.module.css";
import classes from "../styles/button.module.css";
import "../styles/spinner.css";

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

  const togglePlanet = (index) => {
    handlePlanetToggle(index, planetDropdowns, setPlanetDropdowns);
  };

  const planetSelection = (index, value) => {
    handlePlanetSelection(
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
    );
  };

  const vehicleSelection = (index, value) => {
    handleVehicleSelection(
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
    );
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
      .catch((error) => {
        console.log("Error fetching planets:", error);
        setTokenErrorMessage(
          "Failed to fetch planets. Please try again later."
        );
      });

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
      .catch((error) => {
        console.log("Error fetching vehicles:", error);
        setTokenErrorMessage(
          "Failed to fetch vehicles. Please try again later."
        );
      });

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

  const findFalcone = () => {
    handleFindFalcone(
      planetNames,
      vehicleNames,
      navigate,
      totalTimeTaken,
      setTokenErrorMessage
    );
  };

  return (
    <>
      <Header />
      <div className={styles.App}>
        <div className={styles.home}>
          <h4>Select planets you want to search in: </h4>

          {loading ? (
            <div className="spinner" />
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
                    handlePlanetSelection={planetSelection}
                    handleVehicleSelection={vehicleSelection}
                  />
                </>
              )}
            </>
          )}
          <div>
            <Button
              onClick={findFalcone}
              className={classes.button}
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
      </div>
      <Footer />
    </>
  );
}
