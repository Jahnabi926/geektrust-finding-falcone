import {
  DestinationDropdown,
  VehicleDropdown,
} from "../helpers/SelectorUtilityFunctions";
import styles from "../styles/selector.module.css";

export default function Selector(props) {
  const {
    planetOptions,
    planetDropdowns,
    vehicleDropdowns,
    handlePlanetToggle,
    handlePlanetSelection,
    handleVehicleSelection,
  } = props;

  return (
    <>
      <div className={styles.container}>
        {planetDropdowns.map((dropdown, index) => (
          <div key={`planet-dropdown-${index}`}>
            <DestinationDropdown
              dropdown={dropdown}
              index={index}
              planetOptions={planetOptions}
              planetDropdowns={planetDropdowns}
              handlePlanetToggle={handlePlanetToggle}
              handlePlanetSelection={handlePlanetSelection}
            />
            <VehicleDropdown
              dropdown={vehicleDropdowns[index]}
              index={index}
              handleVehicleSelection={handleVehicleSelection}
            />
          </div>
        ))}
      </div>
    </>
  );
}
