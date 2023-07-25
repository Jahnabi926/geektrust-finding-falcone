import { renderVehicleDropdown } from "../helpers/VehicleUtilityFunctions";

export default function VehicleChecklist(props) {
  const { vehicleDropdowns } = props;

  return <>{vehicleDropdowns.map(renderVehicleDropdown)}</>;
}
