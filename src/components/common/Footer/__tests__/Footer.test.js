import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("renders without errors", () => {
    render(<Footer />);
  });

  test("displays the correct text in the footer", () => {
    render(<Footer />);
    const footerText = screen.getByText(
      "Coding problem - www.geektrust.in/finding-falcone"
    );
    expect(footerText).toBeInTheDocument();
  });
});
