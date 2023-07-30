import { useState } from "react";
import PlanetDropdown from "../PlanetDropdown/PlanetDropdown";
import VehicleDropdown from "../VehicleDropdown/VehicleDropdown";
import styles from "../Selector/selector.module.css";

export default function Selector(props) {
  const {
    planetOptions,
    planetDropdowns,
    vehicleDropdowns,
    handlePlanetToggle,
    handlePlanetSelection,
    handleOptionSelection,
    handleVehicleSelection,
  } = props;

  const [userInputs, setUserInputs] = useState(planetDropdowns.map(() => ""));

  // Function to handle user input change for a specific destination dropdown
  const handleInput = (index, value) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  return (
    <div className={styles.container}>
      {planetDropdowns.map((dropdown, index) => (
        <div key={`planet-dropdown-${index}`}>
          <PlanetDropdown
            dropdown={dropdown}
            index={index}
            planetOptions={planetOptions}
            planetDropdowns={planetDropdowns}
            handlePlanetToggle={handlePlanetToggle}
            handlePlanetSelection={handlePlanetSelection}
            handleOptionSelection={handleOptionSelection}
            userInput={userInputs[index]}
            handleInput={(value) => handleInput(index, value)}
          />
          <VehicleDropdown
            dropdown={vehicleDropdowns[index]}
            index={index}
            handleVehicleSelection={handleVehicleSelection}
          />
        </div>
      ))}
    </div>
  );
}