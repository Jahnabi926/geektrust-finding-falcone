import Button from "./Button";

export default function Dropdown(props) {
  const {
    planetDropdowns,
    handlePlanetToggle,
    planetOptions,
    handlePlanetSelection,
  } = props;

  const renderDropdownOptions = (index) => {
    return (
      <ul className="planets-dropdown-list">
        {planetOptions
          .filter((option) =>
            planetDropdowns.every(
              (d, i) => i === index || d.selected !== option.name
            )
          )
          .map((option) => (
            <li
              key={`dropdown-${index}-${option.name}`}
              onClick={() => handlePlanetSelection(index, option)}
            >
              {option.name}
            </li>
          ))}
      </ul>
    );
  };

  const renderPlanetDropdown = (dropdown, index) => {
    return (
      <div key={`planet-dropdown-${index}`} className="planet-dropdown-container">
        <p>Destination {`${index + 1}`}</p>
        <Button onClick={() => handlePlanetToggle(index)}>
          {dropdown.selected ? dropdown.selected.name : "Select an option"}
        </Button>
        {dropdown.isOpen && renderDropdownOptions(index)}
      </div>
    );
  };
  return (
    <div className="container">{planetDropdowns.map(renderPlanetDropdown)}</div>
  );
}
