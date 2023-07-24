import Button from "./Button";
export default function Selector(props) {
  const {
    dropdown,
    index,
    planetOptions,
    planetDropdowns,
    handlePlanetToggle,
    handlePlanetSelection,
    handleVehicleSelection,
  } = props;
  console.log("Props in Selector:", props);

  return (
    <>
      {" "}
      <div
        key={`planet-dropdown-${index}`}
        className="planet-dropdown-container"
      >
        <p>Destination {`${index + 1}`}</p>
        <Button onClick={() => handlePlanetToggle(index)}>
          {dropdown.selected ? dropdown.selected.name : "Select an option"}
        </Button>
        {dropdown.isOpen && (
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
        )}
        {dropdown.isOpen && (
          <ul className="vehicles-dropdown-list">
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
      </div>
    </>
  );
}
