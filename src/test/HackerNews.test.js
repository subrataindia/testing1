import * as React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HackerNews from "../HackerNews";

jest.mock("axios");

describe("HackerNews test suite", () => {
  it("fetches stories from an API and displays them", async () => {
    const stories = [
      { objectID: "1", title: "This is first title" },
      { objectID: "2", title: "This is second title" },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );

    render(<HackerNews />);

    userEvent.click(screen.getByRole("button"));
    const items = await screen.findAllByRole("listitem");
    screen.debug();
    expect(items).toHaveLength(2);
  });
  it("fetches stories from an API and fails", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<HackerNews />);

    userEvent.click(screen.getByRole("button"));

    const message = await screen.findByText(/Something went wrong/);
    screen.debug();
    expect(message).toBeInTheDocument();
  });
});
