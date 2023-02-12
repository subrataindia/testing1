import React from "react";
import { render, screen } from "@testing-library/react";
import CommentComponent from "../CommentComponent";
import userEvent from "@testing-library/user-event";

test("test comment component", () => {
  render(<CommentComponent />);
  expect(screen.getByText("No Comments", { exact: false })).toBeInTheDocument();
  userEvent.type(
    screen.getByPlaceholderText("write your comment here", { exact: false }),
    "This is my first comment"
  );
  userEvent.click(screen.getByRole("checkbox"));
  userEvent.click(
    screen.getByRole("button", { name: "comment", exact: false })
  );
  screen.debug();
  expect(screen.getAllByLabelText("li")).toHaveLength(1);
  expect(screen.queryByText("No Comments", { exact: false })).toBeNull();
  userEvent.type(
    screen.getByPlaceholderText("write your comment here", { exact: false }),
    "This is my Second comment"
  );
  userEvent.click(screen.getByRole("checkbox"));
  userEvent.click(
    screen.getByRole("button", { name: "comment", exact: false })
  );
  expect(screen.getAllByLabelText("li")).toHaveLength(2);
});
