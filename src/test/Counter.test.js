import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "../Counter";

describe("<Counter />", () => {
  test("rendering counter component", () => {
    render(<Counter />);
    screen.debug();
    expect(
      screen.getByText("Counter app", { exact: false })
    ).toBeInTheDocument();
  });
  test("There should not be input element", () => {
    render(<Counter />);
    // TestingLibraryElementError: Unable to find an accessible element with the role "input"
    // expect(screen.getByRole("input")).toBeNull();
    expect(screen.queryByRole("input")).toBeNull();
  });
});
