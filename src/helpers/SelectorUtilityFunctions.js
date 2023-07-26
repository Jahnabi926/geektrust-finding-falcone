import Button from "../components/Button";
import styles from "../styles/selector.module.css";

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
  handlePlanetToggle,
  handlePlanetSelection,
}) => {
  return (
    <>
      <p>Destination {`${index + 1}`}</p>
      <Button
        onClick={() => handlePlanetToggle(index)}
        className={styles.dropdown_button}
      >
        {dropdown.selected ? dropdown.selected.name : "Select an option"}
      </Button>
      {dropdown.isOpen && (
        <ul className={styles.planets_dropdown_list}>
          {filterPlanetOptions(planetOptions, planetDropdowns, index).map(
            (option) => (
              <li
                key={`dropdown-${index}-${option.name}`}
                onClick={() => handlePlanetSelection(index, option)}
              >
                {option.name}
              </li>
            )
          )}
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
