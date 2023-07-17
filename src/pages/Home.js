import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [planetOptions, setPlanetOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [planetDropdowns, setPlanetDropdowns] = useState([
    {
      isOpen: false,
      selected: null,
      id: "d1",
      timeTaken: 0,
      filteredOptions: []
    },
    {
      isOpen: false,
      selected: null,
      id: "d2",
      timeTaken: 0,
      filteredOptions: []
    },
    {
      isOpen: false,
      selected: null,
      id: "d3",
      timeTaken: 0,
      filteredOptions: []
    },
    {
      isOpen: false,
      selected: null,
      id: "d4",
      timeTaken: 0,
      filteredOptions: []
    }
  ]);
  const [vehicleDropdowns, setVehicleDropdowns] = useState([
    {
      isOpen: false,
      selected: null,
      id: "v1",
      associatedPlanetDropdown: "d1",
      selectedPlanet: null,
      filteredVehicleOptions: []
    },
    {
      isOpen: false,
      selected: null,
      id: "v2",
      associatedPlanetDropdown: "d2",
      selectedPlanet: null,
      filteredVehicleOptions: []
    },
    {
      isOpen: false,
      selected: null,
      id: "v3",
      associatedPlanetDropdown: "d3",
      selectedPlanet: null,
      filteredVehicleOptions: []
    },
    {
      isOpen: false,
      selected: null,
      id: "v4",
      associatedPlanetDropdown: "d4",
      selectedPlanet: null,
      filteredVehicleOptions: []
    }
  ]);
  const [tokenErrorMessage, setTokenErrorMessage] = useState(null);
  const [planetNames, setPlanetNames] = useState([]);
  const [vehicleNames, setVehicleNames] = useState([]);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);

  const navigate = useNavigate();

  const handlePlanetToggle = (index) => {
    const updatedDropdowns = [...planetDropdowns];
    updatedDropdowns[index].isOpen = !updatedDropdowns[index].isOpen;
    setPlanetDropdowns(updatedDropdowns);
  };

  const calculateTimeTaken = (planet, vehicle) => {
    if (planet && vehicle) {
      return planet.distance / parseFloat(vehicle.speed);
    }
    return 0;
  };

  const handlePlanetSelection = (index, value) => {
    const updatedDropdowns = [...planetDropdowns];
    updatedDropdowns[index].selected = value;
    updatedDropdowns[index].isOpen = false;

    const updatedPlanetOptions = planetOptions.filter(
      (planet) => planet.name !== value
    );

    // Update the rest of the dropdowns with filtered options
    const filteredDropdowns = updatedDropdowns.map(
      (dropdown, dropdownIndex) => {
        if (dropdownIndex !== index) {
          const filteredOptions = dropdown.selected
            ? updatedPlanetOptions.filter(
                (planet) => planet.name !== dropdown.selected.name
              )
            : updatedPlanetOptions;
          return {
            ...dropdown,
            filteredOptions: filteredOptions
          };
        }
        return dropdown;
      }
    );

    setPlanetOptions(updatedPlanetOptions);
    setPlanetDropdowns(filteredDropdowns);
    // Calculate distance of the selected planet
    const selectedPlanet = planetOptions.find((planet) => planet === value);
    console.log("planetOptions", planetOptions);
    console.log("selectedPlanet object", selectedPlanet);
    const associatedVehicleDropdown = vehicleDropdowns.find(
      (dropdown) => dropdown.associatedPlanetDropdown === `d${index + 1}`
    );
    if (associatedVehicleDropdown) {
      console.log("vehicleDropdown", associatedVehicleDropdown);
      associatedVehicleDropdown.selectedPlanet = selectedPlanet;
      console.log("1", associatedVehicleDropdown.selectedPlanet);
      // Filter vehicle options based on selected planet's distance
      const filteredVehicleOptions = vehicleOptions.filter((option) => {
        const isOptionValid =
          option.total > 0 && option.maxDistance >= selectedPlanet.distance;
        console.log("2", option.total);
        console.log("3", option.maxDistance);
        console.log("4", selectedPlanet.distance);
        console.log("5", isOptionValid);
        if (isOptionValid) {
          console.log("Selected Planet object:", selectedPlanet);
          console.log("Max Distance:", option.maxDistance);
          console.log(
            "Distance:",
            associatedVehicleDropdown.selectedPlanet.distance
          );
        }

        return isOptionValid;
      });

      console.log("Filtered Vehicle Options:", filteredVehicleOptions); // Add this line to log the filtered options
      const updatedVehicleDropdowns = [...vehicleDropdowns];

      // Find the index of the associated dropdown

      const associatedDropdownIndex = updatedVehicleDropdowns.findIndex(
        (dropdown) => dropdown.id === associatedVehicleDropdown.id
      );

      // Update the associated dropdown with the new filtered options

      if (associatedDropdownIndex !== -1) {
        updatedVehicleDropdowns[associatedDropdownIndex] = {
          ...updatedVehicleDropdowns[associatedDropdownIndex],
          filteredVehicleOptions: filteredVehicleOptions // Added this line to assign the filtered options
        };
        updatedVehicleDropdowns[associatedDropdownIndex].isOpen = true; // Set isOpen to true
      }

      setVehicleDropdowns(updatedVehicleDropdowns);
    }

    const updatedPlanetNames = updatedDropdowns.map(
      (dropdown) => dropdown.selected?.name
    );
    setPlanetNames(updatedPlanetNames);
    console.log("PlanetNames", updatedPlanetNames);
  };

  const handleVehicleSelection = (index, value) => {
    console.log("handleVehicleSelection called");
    console.log("Selected vehicle value:", value);
    console.log("Vehicle options:", vehicleOptions);

    const updatedDropdowns = [...vehicleDropdowns];
    const selectedVehicle = vehicleOptions.find(
      (option) => option.name === value
    );
    console.log("Selected vehicle object:", selectedVehicle);

    updatedDropdowns[index].selected = selectedVehicle.name;
    console.log("The selected vehicle is", updatedDropdowns[index].selected);
    setVehicleDropdowns(updatedDropdowns);

    //Reduce the total number of the selected vehicle
    const updatedVehicleOptions = vehicleOptions.map((option) => {
      if (option.name === value) {
        return {
          ...option,
          total: option.total - 1
        };
      }
      return option;
    });
    setVehicleOptions(updatedVehicleOptions);

    // Retrieve the selected planet object from the associated planet dropdown
    const associatedPlanetDropdown = planetDropdowns.find(
      (dropdown) =>
        dropdown.id === vehicleDropdowns[index].associatedPlanetDropdown
    );
    const selectedPlanet = associatedPlanetDropdown.selected;

    // Calculate time taken for the selected planet and vehicle combination
    const timeTaken = calculateTimeTaken(selectedPlanet, selectedVehicle);

    // Update the timeTaken property in the corresponding planet dropdown
    const updatedPlanetDropdowns = [...planetDropdowns];
    const associatedPlanetIndex = planetDropdowns.findIndex(
      (dropdown) => dropdown.id === associatedPlanetDropdown.id
    );
    updatedPlanetDropdowns[associatedPlanetIndex].timeTaken = timeTaken;
    setPlanetDropdowns(updatedPlanetDropdowns);

    // Update the total time taken
    const totalTime = planetDropdowns.reduce(
      (total, dropdown) => total + dropdown.timeTaken,
      0
    );
    setTotalTimeTaken(totalTime);

    const updatedvehicleNames = updatedDropdowns.map(
      (dropdown) => dropdown.selected
    );
    setVehicleNames(updatedvehicleNames);
    console.log("VehicleNames", updatedvehicleNames);
  };

  useEffect(() => {
    console.log("Inside useEffect");

    // Fetch planet options

    fetch("https://findfalcone.geektrust.com/planets")
      .then((response) => response.json())
      .then((data) => {
        const planetsData = data.map((planet) => {
          return {
            name: planet.name,
            distance: planet.distance
          };
        });
        setPlanetOptions(planetsData);
      })
      .catch((error) => console.log(error));

    // Fetch vehicle options

    fetch("https://findfalcone.geektrust.com/vehicles")
      .then((response) => response.json())
      .then((data) => {
        const vehiclesData = data.map((vehicle) => {
          return {
            name: vehicle.name,
            total: vehicle.total_no,
            maxDistance: vehicle.max_distance,
            speed: vehicle.speed
          };
        });
        setVehicleOptions(vehiclesData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFindFalcone = () => {
    let foundPlanet;
    // Fetch token
    let token;
    fetch("https://findfalcone.geektrust.com/token", {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Token response:", data);
        token = data.token;
        const requestData = {
          token,
          planet_names: planetNames,
          vehicle_names: vehicleNames
        };
        //fetch result
        fetch("https://findfalcone.geektrust.com/find", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        })
          .then((response) => response.json())
          .then((data) => {
            foundPlanet = data.planet_name;

            const result =
              data.status === "success"
                ? data.planet_name
                : "AI Falcone not found";
            console.log("data from api", result);
            // Redirect to the Result component with the result in the URL
            navigate("/result", {
              state: {
                totalTimeTaken,
                foundPlanet,
                result
              }
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        const errorMessage =
          "Token not initialized. Please get a new token with /token API.";
        setTokenErrorMessage(errorMessage);
        console.log(error);
      });
  };
  return (
    <div className="App">
      <h1>Finding Falcone !</h1>
      <h4>Select planets you want to search in: </h4>
      {/* Display the total time taken for the complete search */}

      {totalTimeTaken !== null && <p>Time Taken: {totalTimeTaken}</p>}

      <div className="container">
        {planetDropdowns.map((dropdown, index) => (
          <div key={`dropdown-${index}`}>
            <p>Destination {`${index + 1}`}</p>
            <button onClick={() => handlePlanetToggle(index)}>
              {dropdown.selected ? dropdown.selected.name : "Select an option"}
            </button>
            {dropdown.isOpen && (
              <ul className="dropdown-list">
                {planetOptions
                  .filter((option) =>
                    planetDropdowns.every(
                      (d, i) => i === index || d.selected !== option.name
                    )
                  )
                  .map((option) => (
                    <li
                      key={option.name}
                      onClick={() => handlePlanetSelection(index, option)}
                    >
                      {option.name}
                    </li>
                  ))}
              </ul>
            )}
            {/* {dropdown.selected && <p>Time Taken: {dropdown.timeTaken}</p>} */}
          </div>
        ))}
      </div>
      {/* <h1>Select a vehicle</h1> */}
      <div className="container">
        {vehicleDropdowns.map((dropdown, index) => (
          <div key={`dropdown-${index}`}>
            {dropdown.isOpen && (
              <ul className="dropdown-list">
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
      <div className="button-container">
        <button
          onClick={handleFindFalcone}
          disabled={
            planetNames.length < 4 ||
            vehicleNames.length < 4 ||
            planetNames.includes(null) ||
            vehicleNames.includes(null)
          }
        >
          Find Falcone!
        </button>
      </div>
      {/* Display the token error message */}
      {tokenErrorMessage && (
        <div className="error-container">
          <p>{tokenErrorMessage}</p>
        </div>
      )}
    </div>
  );
}
