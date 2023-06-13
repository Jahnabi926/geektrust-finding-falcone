import { useState, useEffect, useRef } from "react";
import styles from "./Vehicles.module.css";

export default function Vehicles({ vehicleOptions, onVehicleSelect }) {
  const [vehicles, setVehicles] = useState([]);
  const [dropdowns, setDropdowns] = useState({
    dropdown1: { isOpen: false, selected: null, options: [] },
    dropdown2: { isOpen: false, selected: null, options: [] },
    dropdown3: { isOpen: false, selected: null, options: [] },
    dropdown4: { isOpen: false, selected: null, options: [] },
  });

  const handleToggle = (id) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        isOpen: !prevState[id].isOpen,
      },
    }));
  };

  const handleVehicleSelect = (id, value) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        selected: value,
        isOpen: false,
      },
    }));

    onVehicleSelect(value);

    setDropdowns((prevState) => {
      const updatedOptions = Object.keys(prevState).reduce(
        (options, dropdownId) => {
          const dropdownOptions = prevState[dropdownId].options.map(
            (option) => {
              if (option.name === value) {
                const updatedTotal =
                  option.total - 1 >= 0 ? option.total - 1 : 0;
                return {
                  ...option,
                  total: updatedTotal,
                };
              }
              return option;
            }
          );
          return {
            ...options,
            [dropdownId]: {
              ...prevState[dropdownId],
              options: dropdownOptions,
            },
          };
        },
        {}
      );

      return {
        ...prevState,
        ...updatedOptions,
      };
    });
  };

  const dropdownRefs = useRef({});
  useEffect(() => {
    fetch("https://findfalcone.geektrust.com/vehicles")
      .then((response) => response.json())
      .then((data) => {
        const updatedOptions = data.map((vehicle) => ({
          name: vehicle.name,
          total: vehicle.total_no !== undefined ? vehicle.total_no : 0,
        }));
        setVehicles(updatedOptions);
        setDropdowns((prevState) => ({
          ...prevState,
          dropdown1: { ...prevState.dropdown1, options: [...updatedOptions] },
          dropdown2: { ...prevState.dropdown2, options: [...updatedOptions] },
          dropdown3: { ...prevState.dropdown3, options: [...updatedOptions] },
          dropdown4: { ...prevState.dropdown4, options: [...updatedOptions] },
        }));
      })
      .catch((error) => console.log(error));

    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach((id) => {
        if (
          dropdownRefs.current[id] &&
          !dropdownRefs.current[id].contains(event.target)
        ) {
          setDropdowns((prevState) => ({
            ...prevState,
            [id]: {
              ...prevState[id],
              isOpen: false,
            },
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.list_of_dropdowns}>
      {Object.keys(dropdowns).map((id) => (
        <div
          key={id}
          className={styles.dropdown_container}
          ref={(el) => (dropdownRefs.current[id] = el)}
        >
          <button
            className={styles.dropdown_header}
            onClick={() => handleToggle(id)}
          >
            {dropdowns[id].selected || "Select an option"}
          </button>
          {dropdowns[id].isOpen && (
            <ul className={styles.dropdown_options}>
              {dropdowns[id].options.map((option) => (
                <li
                  key={option.name}
                  className={`${styles.vehicle_option} ${
                    option.total === 0 ? styles.disabled : ""
                  }`}
                >
                  <label>
                    <input
                      type="radio"
                      name={id}
                      value={option.name}
                      checked={option.name === dropdowns[id].selected}
                      onChange={() => handleVehicleSelect(id, option.name)}
                      disabled={option.total === 0}
                    />
                    <span
                      className={`${styles.vehicle_name} ${
                        option.total === 0 ? styles.disabledText : ""
                      }`}
                    >
                      {option.name}
                    </span>
                    <span
                      className={`${styles.vehicle_count} ${
                        option.total === 0 ? styles.disabledText : ""
                      }`}
                    >{`(${option.total})`}</span>
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
