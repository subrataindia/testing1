import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserScreen, { Search } from "../UserScreen";

describe("<UserScreen>", () => {
  it("renders App component", async () => {
    render(<UserScreen />);
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });
    waitFor(() => {
      expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
    });
    //screen.debug();
    // expect(screen.queryByText(/Signed in as/)).toBeNull();
    // expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });
});

describe("Search", () => {
  it("calls the onChange callback handler using fireEvent", () => {
    // Mock Function
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe("Search", () => {
  it("calls the onChange callback handler using userEvent", () => {
    // Jest
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    userEvent.type(screen.getByRole("textbox"), "JavaScript");

    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
