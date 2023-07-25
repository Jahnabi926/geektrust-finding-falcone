import React from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Result = () => {
  const location = useLocation();
  const { findResult, totalTimeTaken, foundPlanet } = location.state || {};

  return (
    <>
      <Header />
      <div className="App">
        <div className="result">
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
          <Button className="button">Start Again</Button>
        </Link>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Result;
