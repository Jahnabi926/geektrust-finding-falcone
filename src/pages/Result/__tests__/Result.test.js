import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import renderer from "react-test-renderer";
import Result from "../Result";

describe("Result Component", () => {
  const resultNotFoundState = {
    findResult: "AI Falcone not found",
    totalTimeTaken: 0,
    foundPlanet: "",
  };

  const resultSuccessState = {
    findResult: "success",
    totalTimeTaken: 123,
    foundPlanet: "Donlon",
  };

  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/result" element={<Result />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test("displays 'AI Falcone not found' message when findResult is 'AI Falcone not found'", () => {
    render(
      <MemoryRouter initialEntries={[{ state: resultNotFoundState }]}>
        <Result />
      </MemoryRouter>
    );

    const aiFalconeMessage = screen.getByText(/AI Falcone not found/i);
    expect(aiFalconeMessage).toBeInTheDocument();
  });

  test("displays 'Success' message when findResult is 'success'", () => {
    render(
      <MemoryRouter initialEntries={[{ state: resultSuccessState }]}>
        <Result />
      </MemoryRouter>
    );

    const successMessage = screen.getByText(
      "Success! Congratulations on Finding Falcone. King Shan is mighty pleased."
    );
    expect(successMessage).toBeInTheDocument();
  });

  test("displays 'Time Taken' and 'Planet Found' information", () => {
    render(
      <MemoryRouter initialEntries={[{ state: resultSuccessState }]}>
        <Result />
      </MemoryRouter>
    );

    const timeTaken = screen.getByText("Time Taken: 123");
    const planetFound = screen.getByText("Planet found: Donlon");

    expect(timeTaken).toBeInTheDocument();
    expect(planetFound).toBeInTheDocument();
  });

  test("clicking 'Start Again' button redirects to the home page", () => {
    render(
      <MemoryRouter initialEntries={[{ state: resultSuccessState }]}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
        <Result />
      </MemoryRouter>
    );

    const startAgainButton = screen.getByText("Start Again");

    expect(startAgainButton).toBeInTheDocument();

    fireEvent.click(startAgainButton);

    // Ensures that the current route has changed to the home page
    const homePage = screen.getByText("Home");
    expect(homePage).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const locationState = {
      findResult: "Success",
      totalTimeTaken: 123,
      foundPlanet: "Donlon",
    };

    const tree = renderer
      .create(
        <MemoryRouter>
          <Result />
        </MemoryRouter>,
        { initialEntries: [{ state: locationState }] }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
