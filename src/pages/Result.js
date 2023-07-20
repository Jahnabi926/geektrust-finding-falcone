import React from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "../components/Button";

const Result = () => {
  const location = useLocation();
  const { findResult, totalTimeTaken, foundPlanet } = location.state || {};

  return (
    <div>
      <h1>Finding Falcone !</h1>
      {findResult === null ? (
        <p>Loading...</p>
      ) : (
        <>
          {findResult === "AI Falcone not found" ? (
            <p>AI Falcone not found</p>
          ) : (
            <p>
              Success! Congratulations on Finding Falcone. King Shan is mighty
              pleased.
            </p>
          )}
        </>
      )}
      <p>Time Taken: {totalTimeTaken}</p>
      <p>Planet found: {foundPlanet}</p>
      <Link to="/">
        <Button>Start Again</Button>
      </Link>
    </div>
  );
};

export default Result;
