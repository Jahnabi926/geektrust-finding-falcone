import { render, screen } from "@testing-library/react";
import Spinner from "../Spinner";
import styles from "../spinner.module.css";

describe("Spinner Component", () => {
  test("renders without errors", () => {
    render(<Spinner />);
  });

  test("applies 'styles.spinner' CSS class to the div element", () => {
    render(<Spinner />);
    const spinnerDiv = screen.getByText("", { selector: `.${styles.spinner}` });

    expect(spinnerDiv).toBeInTheDocument();
  });
});
