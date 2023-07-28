import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import Footer from "../components/common/Footer";

describe("Footer Component", () => {
  // Test case 1: Render the footer with the correct text
  it("should render the footer with the correct text", () => {
    const footerText = "Coding problem - www.geektrust.in/finding-falcone";
    render(<Footer />);
    const footerElement = screen.getByText(footerText);
    expect(footerElement).toBeInTheDocument();
  });

  // Test case 2: Ensure the footer has the correct CSS class applied
  it("should have the correct CSS class applied to the footer", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toHaveClass("footer"); 
  });
});
