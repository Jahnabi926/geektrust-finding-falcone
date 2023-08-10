import { useState } from "react";
import styles from "../VehicleDropdown/vehicleDropdown.module.css";

export default function VehicleDropdown({
  dropdown,
  index,
  handleVehicleSelection,
  vehicleOptions,
}) {
  // if (dropdown.selected) {
  //   const isChecked = dropdown.selected;
  //   return isChecked;
  // }
const [options, setOptions] = useState(vehicleOptions);

  console.log("vehicleOptions", vehicleOptions);
  return (
    <>
      {dropdown.isOpen && (
        <ul className={styles.vehicles_dropdown_list}>
          {options
            .filter(
              (option, vehicleIndex) =>
                option.total > 0 &&
                option.maxDistance >= dropdown.selectedPlanet.distance
            )
            .map((option, optionIndex) => {
              const isChecked = option.name === dropdown.selected
              return (
                <li key={`option-${index}-${optionIndex}`}>
                  <label>
                    <input
                      type="radio"
                      name={`vehicle-${index}`}
                      value={option.name}
                      checked={isChecked}
                      onChange={() => handleVehicleSelection(optionIndex, !isChecked)}
                      disabled={option.total === 0}
                    />
                    <span>{option.name}</span>
                    <span>({option.total - option.used})</span>
                  </label>
                </li>
              )
            })}
        </ul>
      )}
    </>
  );
}
