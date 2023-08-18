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
          {vehicleOptions.map((option, optionIndex) => {
            const remainingCount = option.total - option.used;
            const isUnclickable = remainingCount === 0;
            const isDisabled =
              option.maxDistance < dropdown.selectedPlanet.distance;
            const labelClasses = [];

            if (isDisabled) {
              labelClasses.push(styles["disabled-label"]);
            }
            if (isUnclickable) {
              labelClasses.push(styles["unclickable-label"]);
            }
            return (
              <li key={`option-${index}-${optionIndex}`}>
                <label className={labelClasses.join(" ")}>
                  <input
                    type="radio"
                    name={`vehicle-${index}`}
                    value={option.name}
                    checked={option.name === dropdown.currentSelectedVehicle}
                    onChange={() => handleVehicleSelection(index, option.name)}
                    disabled={isDisabled || isUnclickable}
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
