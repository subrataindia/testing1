import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CommentForm from "../CommentForm";

describe("<CommentForm />", () => {
  beforeEach(() => {
    render(<CommentForm />);
  });
  it("initial render testing", () => {
    expect(
      screen.getByPlaceholderText("write your comment here", { exact: false })
    ).toBeInTheDocument();
    const checkbox = screen.getByLabelText("i agree to terms and conditions", {
      exact: false,
    });
    expect(checkbox).toBeInTheDocument();
    const submitButton = screen.getByRole("button", {
      name: "comment",
      exact: false,
    });
    expect(submitButton).toBeDisabled();
  });
  it("Test comment input", () => {
    fireEvent.change(
      screen.getByPlaceholderText("write your comment here", { exact: false }),
      {
        target: { value: "This is my first comment" },
      }
    );
    expect(
      screen.getByDisplayValue("This is my first comment")
    ).toBeInTheDocument();
  });
  it("test button click event", () => {
    cleanup();
    const clickFn = jest.fn();
    render(<CommentForm setComments={clickFn} />);

    const btn = screen.getByRole("button", {
      name: "comment",
      exact: false,
    });
    const inputText = screen.getByPlaceholderText("write your comment here", {
      exact: false,
    });
    const checkBox = screen.getByRole("checkbox");
    screen.debug();
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(clickFn).toBeCalledTimes(1);
    expect(inputText).toHaveValue("");
    expect(checkBox.checked).toBeFalsy();
    expect(btn).toBeDisabled();
    screen.debug();
  });
});
