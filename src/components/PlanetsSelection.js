import { useState, useEffect, useRef } from "react";
import styles from "./Planets.module.css";

export default function Planets({
  planetOptions,
  vehicleOptions,
  onPlanetSelect,
}) {
  const [planets, setPlanets] = useState([]);
  const [dropdowns, setDropdowns] = useState({
    dropdown1: { isOpen: false, selected: null, options: [] },
    dropdown2: { isOpen: false, selected: null, options: [] },
    dropdown3: { isOpen: false, selected: null, options: [] },
    dropdown4: { isOpen: false, selected: null, options: [] },
  });
  const [selectedPlanets, setSelectedPlanets] = useState([]);

  const handleToggle = (id) => {
    setDropdowns((prevState) => {
      const isOpen = !prevState[id].isOpen;
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          isOpen,
        },
      };
    });
  };

  const handlePlanetSelect = (id, value) => {
    setDropdowns((prevState) => {
      const selected = value;
      const isOpen = false;
      const updatedDropdowns = {
        ...prevState,
        [id]: {
          ...prevState[id],
          selected,
          isOpen,
        },
      };

      Object.keys(updatedDropdowns).forEach((key) => {
        if (key !== id) {
          updatedDropdowns[key] = {
            ...updatedDropdowns[key],
            options: prevState[key].options.filter(
              (option) => option !== selected
            ),
          };
        }
      });

      return updatedDropdowns;
    });

    onPlanetSelect(value);
  };

  const dropdownRefs = useRef({});
  useEffect(() => {
    fetch("https://findfalcone.geektrust.com/planets")
      .then((response) => response.json())
      .then((data) => {
        const planetNames = data.map((planet) => planet.name);
        setPlanets(planetNames);
        setDropdowns((prevState) => ({
          ...prevState,
          dropdown1: { ...prevState.dropdown1, options: planetNames },
          dropdown2: { ...prevState.dropdown2, options: planetNames },
          dropdown3: { ...prevState.dropdown3, options: planetNames },
          dropdown4: { ...prevState.dropdown4, options: planetNames },
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
          className="dropdown-container"
          ref={(el) => (dropdownRefs.current[id] = el)}
        >
          <button className="dropdown-header" onClick={() => handleToggle(id)}>
            {dropdowns[id].selected || "Select an option"}
          </button>
          {dropdowns[id].isOpen && (
            <ul className={styles.dropdown_options}>
              {dropdowns[id].selected && (
                <li
                  key={dropdowns[id].selected}
                  onClick={() => handlePlanetSelect(id, dropdowns[id].selected)}
                  className={styles.selected}
                >
                  {dropdowns[id].selected}
                </li>
              )}
              {dropdowns[id].options
                .filter((option) => option !== dropdowns[id].selected) // Exclude the selected option
                .map((option) => (
                  <li
                    key={option}
                    onClick={() => handlePlanetSelect(id, option)}
                    className={
                      option === dropdowns[id].selected ? "selected" : ""
                    }
                  >
                    {option}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
