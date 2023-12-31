import styles from "../PlanetDropdown/planetDropdown.module.css";
import Button from "../common/Button/Button";
import classes from "../common/Button/button.module.css";
import caretIcon from "../../images/caret-icon.jpg";
import iconStyle from "../../images/caretIcon.module.css";
import { useState } from "react";

const filteredPlanetOptions = (planetOptions, inputValue, index) =>
  planetOptions
    .filter(
      (option) =>
        option.selectedByDropDown === `d${index + 1}` ||
        option.selectedByDropDown === undefined
    )
    .filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );

export default function PlanetDropdown({
  dropdown,
  index,
  planetOptions,
  handlePlanetToggle,
  handlePlanetSelection,
  userInput,
  handleInput,
}) {
  const [inputValue, setInputValue] = useState(userInput);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    handleInput(newValue);
  };

  const options = filteredPlanetOptions(planetOptions, inputValue, index);

  return (
    <>
      <p>Destination {`${index + 1}`}</p>
      {dropdown.isOpen ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Start typing to search..."
          autoFocus
        />
      ) : (
        <Button
          onClick={() => handlePlanetToggle(index)}
          className={classes.dropdown_button}
        >
          {dropdown.selectedPlanet
            ? dropdown.selectedPlanet.name
            : "Select an option"}
          <img
            className={iconStyle.caret}
            src={caretIcon}
            alt="Caret Icon"
            preload="auto"
          />
        </Button>
      )}
      {dropdown.isOpen && (
        <ul className={styles.planets_dropdown_list}>
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={`dropdown-${index}-${option.name}`}
                onClick={() => {
                  handlePlanetSelection(index, option);
                  setInputValue(option.name);
                }}
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className={styles.no_matching_options}>
              No matching options found.
            </li>
          )}
        </ul>
      )}
    </>
  );
}
