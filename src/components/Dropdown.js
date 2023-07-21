import Button from "./Button";

export default function Dropdown(props) {
  const {
    planetDropdowns,
    handlePlanetToggle,
    planetOptions,
    handlePlanetSelection,
  } = props;

  return (
    <div className="container">
      {planetDropdowns.map((dropdown, index) => (
        <div key={`dropdown-${index}`} className="planet-dropdown-container">
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
                    key={option.name}
                    onClick={() => handlePlanetSelection(index, option)}
                  >
                    {option.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
