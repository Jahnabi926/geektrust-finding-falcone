import { useState } from "react";
import styles from "../VehicleDropdown/vehicleDropdown.module.css";

export default function VehicleDropdown({
  dropdown,
  index,
  handleVehicleSelection,
  vehicleOptions,
}) {
  const [options, setOptions] = useState(vehicleOptions);

  console.log("vehicleOptions", vehicleOptions);
  return (
    <>
      {dropdown.isOpen && (
        <ul className={styles.vehicles_dropdown_list}>
          {options
            .filter(
              (option) =>
                option.total > 0 &&
                option.maxDistance >= dropdown.selectedPlanet.distance
            )
            .map((option, optionIndex) => {
              return (
                <li key={`option-${index}-${optionIndex}`}>
                  <label>
                    <input
                      type="radio"
                      name={`vehicle-${index}`}
                      value={option.name}
                      checked={option.name === dropdown.selected}
                      onChange={() =>
                        handleVehicleSelection(index, optionIndex, option.name)
                      }
                      disabled={option.total === 0}
                    />
                    <span>{option.name}</span>
                    <span>({option.total - option.used})</span>
                  </label>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}
