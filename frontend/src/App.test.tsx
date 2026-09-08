import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Calculator app", () => {
  it("hides the second-number input when square root is selected", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
        screen.getByRole("spinbutton", { name: /^second number$/i }),
    ).toBeInTheDocument();  

    await user.selectOptions(
      screen.getByLabelText(/operation/i),
      "sqrt",
    );

    expect(
        screen.queryByRole("spinbutton", { name: /^second number$/i }),
    ).not.toBeInTheDocument();            
  });
});