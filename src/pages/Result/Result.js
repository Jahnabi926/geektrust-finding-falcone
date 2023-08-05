import React from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import styles from "../Result/result.module.css";
import classes from "../../components/common/Button/button.module.css";
import Spinner from "../../components/common/Spinner/Spinner";

const Result = () => {
  const location = useLocation();
  const { findResult, totalTimeTaken, foundPlanet } = location.state || {};

  return (
    <>
      <Header />
      <div className="App">
        <div className={styles.result}>
          {findResult === null ? (
            <Spinner />
          ) : (
            <>
              {findResult === "AI Falcone not found" ? (
                <p>AI Falcone not found</p>
              ) : (
                <p>
                  Success! Congratulations on Finding Falcone. King Shan is
                  mighty pleased.
                </p>
              )}
            </>
          )}
          <p>Time Taken: {totalTimeTaken}</p>
          <p>
            Planet found:{" "}
            {findResult === "AI Falcone not found"
              ? "None"
              : foundPlanet}
          </p>
          <Link to="/">
            <Button className={classes.button_result}>Start Again</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Result;
