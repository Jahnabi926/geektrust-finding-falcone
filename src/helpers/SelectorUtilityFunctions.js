import { useState } from "react";
import Button from "../components/Button";
import styles from "../styles/selector.module.css";
import classes from "../styles/button.module.css";

//Function to filter planet options
const filterPlanetOptions = (planetOptions, planetDropdowns, index) => {
  return planetOptions.filter((option) =>
    planetDropdowns.every((d, i) => i === index || d.selected !== option.name)
  );
};

// DestinationDropdown component
export const DestinationDropdown = ({
  dropdown,
  index,
  planetOptions,
  planetDropdowns,
  setPlanetDropdowns,
  handlePlanetToggle,
  handlePlanetSelection,
  userInput,
  handleInput,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    handlePlanetSelection(index, option);
    handlePlanetToggle(index);
  };

  // Function to filter planet options based on user input
  const filterPlanetOptions = (planetOptions, userInput) => {
    return planetOptions.filter((option) =>
      option.name.toLowerCase().includes(userInput.toLowerCase())
    );
  };

  return (
    <>
      <p>Destination {`${index + 1}`}</p>
      <input
        type="text"
        value={selectedOption ? selectedOption.name : userInput}
        onChange={(e) => handleInput(e.target.value)}
        onClick={() => handlePlanetToggle(index)}
        placeholder="Start typing to search..."
      />
      {planetDropdowns[index].isOpen && userInput && (
        <ul className={styles.planets_dropdown_list}>
          {filterPlanetOptions(planetOptions, userInput).map((option) => (
            <li
              key={`dropdown-${index}-${option.name}`}
              onClick={() => handleOptionSelection(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

//VehicleDropdown component
export const VehicleDropdown = ({
  dropdown,
  index,
  handleVehicleSelection,
}) => {
  return (
    <>
      {dropdown.isOpen && (
        <ul className={styles.vehicles_dropdown_list}>
          {dropdown.filteredVehicleOptions.map((option, optionIndex) => (
            <li key={`option-${index}-${optionIndex}`}>
              <label>
                <input
                  type="radio"
                  name={`vehicle-${index}`}
                  value={option.name}
                  checked={option.name === dropdown.selected}
                  onChange={() => handleVehicleSelection(index, option.name)}
                  disabled={option.total === 0}
                />
                <span>{option.name}</span>
                <span>({option.total})</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
