import styles from "../VehicleDropdown/vehicleDropdown.module.css";

export default function VehicleDropdown({
  dropdown,
  index,
  handleVehicleSelection,
}) {
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
                  onChange={() => handleVehicleSelection(index, option)}
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
}
