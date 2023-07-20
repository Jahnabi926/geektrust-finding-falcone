export default function VehicleChecklist(props) {
  const { vehicleDropdowns, handleVehicleSelection } = props;
  return (
    <div className="container">
      {vehicleDropdowns.map((dropdown, index) => (
        <div key={`dropdown-${index}`} className="vehicle-dropdown-container">
          {dropdown.isOpen && (
            <ul className="vehicles-dropdown-list">
              {dropdown.filteredVehicleOptions.map((option) => (
                <li key={option.name}>
                  <label>
                    <input
                      type="radio"
                      name={`vehicle-${index}`}
                      value={option.name}
                      checked={option.name === dropdown.selected}
                      onChange={() =>
                        handleVehicleSelection(index, option.name)
                      }
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
      ))}
    </div>
  );
}
