import { useState } from "react";
import styles from "../PlanetDropdown/planetDropdown.module.css";

const handleOptionSelection = (
  option,
  index,
  setSelectedOption,
  handlePlanetSelection,
  handlePlanetToggle
) => {
  setSelectedOption(option);
  handlePlanetSelection(index, option);
  handlePlanetToggle(index);
};

// Function to filter planet options based on user input
const filterPlanetOptions = (planetOptions, userInput) =>
  planetOptions.filter((option) =>
    option.name.toLowerCase().includes(userInput.toLowerCase())
  );

export default function PlanetDropdown({
  dropdown,
  index,
  planetOptions,
  planetDropdowns,
  setPlanetDropdowns,
  handlePlanetToggle,
  handlePlanetSelection,
  userInput,
  handleInput,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

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
              onClick={() =>
                handleOptionSelection(
                  option,
                  index,
                  setSelectedOption,
                  handlePlanetSelection,
                  handlePlanetToggle
                )
              }
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
