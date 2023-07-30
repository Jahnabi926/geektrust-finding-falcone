import styles from "../PlanetDropdown/planetDropdown.module.css";
import Button from "../common/Button/Button";
import classes from "../common/Button/button.module.css";
import caretIcon from "../../images/caret-icon.jpg";
import iconStyle from "../../images/caretIcon.module.css";

// const handleOptionSelection = (
//   option,
//   index,
//   setSelectedOption,
//   handlePlanetSelection,
//   handlePlanetToggle
// ) => {
//   setSelectedOption(option);
//   handlePlanetSelection(index, option);
//   handlePlanetToggle(index);
// };

// // Function to filter planet options based on user input
// const filterPlanetOptions = (planetOptions, userInput) =>
//   planetOptions.filter((option) =>
//     option.name.toLowerCase().includes(userInput.toLowerCase())
//   );

//Function to filter planet options
const filterPlanetOptions = (planetOptions, planetDropdowns, index) => {
  return planetOptions.filter((option) =>
    planetDropdowns.every((d, i) => i === index || d.selected !== option.name)
  );
};

export default function PlanetDropdown({
  dropdown,
  index,
  planetOptions,
  planetDropdowns,
  handlePlanetToggle,
  handlePlanetSelection,
}) {
  // const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <p>Destination {`${index + 1}`}</p>
      {/* <input
        type="text"
        value={selectedOption ? selectedOption.name : userInput}
        onChange={(e) => handleInput(e.target.value)}
        onClick={() => handlePlanetToggle(index)}
        placeholder="Start typing to search..."
      /> */}
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
}
