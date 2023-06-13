import React, { useState, useEffect } from "react";
import Planets from "./components/PlanetsSelection";
import Vehicles from "./components/VehiclesSelection";

export default function App() {
  const [planetOptions, setPlanetOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [result, setResult] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    // Fetch planet data and update planetOptions state
    fetch("https://findfalcone.geektrust.com/planets")
      .then((response) => response.json())
      .then((data) => {
        const planetNames = data.map((planet) => planet.name);
        setPlanetOptions(planetNames);
      })
      .catch((error) => console.log(error));

    // Fetch vehicle data and update vehicleOptions state
    fetch("https://findfalcone.geektrust.com/vehicles")
      .then((response) => response.json())
      .then((data) => {
        const vehicleData = Object.values(data).map((vehicle) => {
          return {
            name: vehicle.name,
            total: vehicle.total_no,
          };
        });
        setVehicleOptions(vehicleData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setVehicleOptions(() => {
      const updatedOptions = vehicleOptions.map((option) => {
        if (option.name === vehicle) {
          return {
            ...option,
            total: option.total - 1,
          };
        } else {
          return option;
        }
      });
      return updatedOptions;
    });
  };

  const handleFindFalcone = () => {
    if (!selectedPlanet || !selectedVehicle) {
      setResult(null);
      setTimeTaken(null);
      return;
    }

    fetch("https://findfalcone.geektrust.com/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const token = data.token;

        const planetNames = selectedPlanet ? [selectedPlanet] : [];
        const vehicleNames = selectedVehicle ? [selectedVehicle] : [];

        if (planetNames.length !== 4 || vehicleNames.length !== 4) {
          setResult(null);
          setTimeTaken(null);
          return;
        }

        const requestData = {
          token,
          planet_names: planetNames.map((planet) => planet.name),
          vehicle_names: vehicleNames.map((vehicle) => vehicle.name),
        };

        fetch("https://findfalcone.geektrust.com/find", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((data) => {
            setResult(
              data.status === "success" ? data.planet_name : "Not Found"
            );
            setTimeTaken(data.status === "success" ? data.time_taken : 0);
            console.log(data); // Check the response data
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Select a Planet:</h1>
      <Planets
        planetOptions={planetOptions}
        vehicleOptions={vehicleOptions}
        onPlanetSelect={handlePlanetSelect}
      />
      {selectedPlanet && (
        <>
          <h1>Select Vehicles:</h1>
          <Vehicles
            planet={selectedPlanet}
            vehicleOptions={vehicleOptions}
            onVehicleSelect={handleVehicleSelect}
          />
        </>
      )}
      <button onClick={handleFindFalcone}>Find Falcone</button>
      {result !== null && (
        <div>
          <h2>Result: {result ? "Success!" : "Failure!"}</h2>
          <h2>Time Taken: {timeTaken}</h2>
        </div>
      )}
    </div>
  );
}
