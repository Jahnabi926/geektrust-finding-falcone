import { useState, useRef, useEffect } from "react";
import PlanetDropdown from "../PlanetDropdown/PlanetDropdown";
import VehicleDropdown from "../VehicleDropdown/VehicleDropdown";
import styles from "../Selector/selector.module.css";
import React from "react";

export default function Selector(props) {
  const {
    planetOptions,
    planetDropdowns,
    vehicleDropdowns,
    handlePlanetToggle,
    handlePlanetSelection,
    handleVehicleSelection,
  } = props;

  const [userInputs, setUserInputs] = useState(planetDropdowns.map(() => ""));

  // Function to handle user input change for a specific planet dropdown
  const handleInput = (index, value) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  // Handle click outside
  const selectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        // Logic to close all open dropdowns when clicking outside
        planetDropdowns.forEach((dropdown, index) => {
          if (dropdown.isOpen) {
            handlePlanetToggle(index);
          }
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [planetDropdowns, handlePlanetToggle]);

  return (
    <div className={styles.selector}>
      <div className={styles.outer_wrap} ref={selectorRef}>
        {planetDropdowns.map((dropdown, index) => (
          <div key={`planet-dropdown-${index}`} className={styles.wrap}>
            <PlanetDropdown
              dropdown={dropdown}
              index={index}
              planetOptions={planetOptions}
              planetDropdowns={planetDropdowns}
              handlePlanetToggle={handlePlanetToggle}
              handlePlanetSelection={handlePlanetSelection}
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
    </div>
  );
}
