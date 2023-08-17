import styles from "../VehicleDropdown/vehicleDropdown.module.css";

export default function VehicleDropdown({
  dropdown,
  index,
  handleVehicleSelection,
  vehicleOptions,
}) {

  console.log("vehicleOptions", vehicleOptions);
  return (
    <>
      {dropdown.isOpen && (
        <ul className={styles.vehicles_dropdown_list}>
          {vehicleOptions
            .filter(
              (option) =>
                option.total > 0 &&
                option.maxDistance >= dropdown.selectedPlanet.distance
            )
            .map((option, optionIndex) => {
              const remainingCount = option.total - option.used;
              return (
                <li key={`option-${index}-${optionIndex}`}>
                  <label>
                    <input
                      type="radio"
                      name={`vehicle-${index}`}
                      value={option.name}
                      checked={option.name === dropdown.selectedVehicle}
                      onChange={() =>
                        handleVehicleSelection(index, option.name)
                      }
                      disabled={remainingCount === 0}
                    />
                    <span>{option.name}</span>
                    <span>({remainingCount})</span>
                  </label>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}
