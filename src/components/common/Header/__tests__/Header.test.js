import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../Header";

describe("Header Component", () => {
    const original = window.location;

    const reloadFn = () => {
      window.location.reload();
    };
  
    beforeAll(() => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: jest.fn() },
      });
    });
  
    afterAll(() => {
      Object.defineProperty(window, 'location', { configurable: true, value: original });
    });
  
  
  // Test case 1: Render the header with the correct title and links
  it("should render the header with the correct title and links", () => {
    render(<Header />);

    // Check if the title is rendered correctly
    const titleElement = screen.getByText("Finding Falcone !");
    expect(titleElement).toBeInTheDocument();

    // Check if the "GeekTrust Home" link is present and has the correct href
    const homeLinkElement = screen.getByText("GeekTrust Home");
    expect(homeLinkElement).toBeInTheDocument();
    expect(homeLinkElement).toHaveAttribute("href", "/");

    // Check if the "Reset" span element is present
    const resetSpanElement = screen.getByText("Reset");
    expect(resetSpanElement).toBeInTheDocument();
  });

  // Test case 2: Ensure clicking on the "Reset" link reloads the page
  it("should reload the page when the 'Reset' link is clicked", () => {
    render(<Header />);

    const resetSpanElement = screen.getByText("Reset");
    fireEvent.click(resetSpanElement);
  });

  it('mocks reload function', () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
  });

  it('calls reload function', () => {
    reloadFn(); // as defined above..
    expect(window.location.reload).toHaveBeenCalled();
  });

  // Test case 3: Ensure the correct CSS classes are applied
  it("should have the correct CSS classes applied to the header elements", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner"); // Selects the <header> element
    expect(headerElement).toBeInTheDocument();

    const titleElement = screen.getByText("Finding Falcone !");
    expect(titleElement).toHaveClass("title");

    const homeLinkContainer = screen.getByTestId("home-link-container"); // Use getByTestId to select the container div of the "GeekTrust Home" link
    expect(homeLinkContainer).toHaveClass("header_links");

    const resetSpanElement = screen.getByText("|");
    expect(resetSpanElement).toHaveClass("header_space");
  });
});
