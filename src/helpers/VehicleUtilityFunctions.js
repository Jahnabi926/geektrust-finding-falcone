const renderVehicleOptions = (dropdown, index, handleVehicleSelection) => {
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

export const renderVehicleDropdown = (dropdown, index) => {
  return (
    <div
      key={`vehicle-dropdown-${index}`}
      className="vehicle-dropdown-container"
    >
      {dropdown.isOpen && renderVehicleOptions(dropdown, index)}
    </div>
  );
};
