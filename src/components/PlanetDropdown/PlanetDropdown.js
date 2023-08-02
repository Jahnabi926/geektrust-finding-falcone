import styles from "../PlanetDropdown/planetDropdown.module.css";
import Button from "../common/Button/Button";
import classes from "../common/Button/button.module.css";
import caretIcon from "../../images/caret-icon.jpg";
import iconStyle from "../../images/caretIcon.module.css";
import { useState } from "react";

const filteredOptions = (planetOptions, inputValue) =>
  planetOptions.filter((option) =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

export default function PlanetDropdown({
  dropdown,
  index,
  planetOptions,
  handlePlanetToggle,
  handlePlanetSelection,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const options = filteredOptions(planetOptions, inputValue);

  return (
    <>
      <p>Destination {`${index + 1}`}</p>
      {dropdown.isOpen ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Start typing to search..."
          autoFocus
        />
      ) : (
        <Button
          onClick={() => handlePlanetToggle(index)}
          className={classes.dropdown_button}
        >
          {dropdown.selected ? dropdown.selected.name : "Select an option"}
          <img
            className={` ${iconStyle.caret} ${
              dropdown.isOpen ? iconStyle.rotated : ""
            }`}
            src={caretIcon}
            alt="Caret Icon"
          />
        </Button>
      )}
      {dropdown.isOpen && (
        <ul className={styles.planets_dropdown_list}>
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={`dropdown-${index}-${option.name}`}
                onClick={() => handlePlanetSelection(index, option)}
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
