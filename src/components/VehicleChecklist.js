export default function VehicleChecklist(props) {
  const { vehicleDropdowns, handleVehicleSelection } = props;

  const renderVehicleOptions = (index, dropdown) => {
    console.log(" renderVehicleOptions rendered");

    return (
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
    );
  };

  const renderVehicleDropdown = (dropdown, index) => {
    console.log(" renderVehicleDropdown rendered");
    return (
      <div
        key={`vehicle-dropdown-${index}`}
        className="vehicle-dropdown-container"
      >
        {dropdown.isOpen && renderVehicleOptions(index, dropdown)}
      </div>
    );
  };
  return (
    <div className="container">
      {vehicleDropdowns.map(renderVehicleDropdown)}
    </div>
  );
}
