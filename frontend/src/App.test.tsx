import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { describe, expect, it, vi } from "vitest";

describe("Calculator app", () => {
    it("shows a validation error when required fields are empty", async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(
            screen.getByRole("button", { name: /^calculate$/i }),
        );

        expect(screen.getByRole("alert")).toHaveTextContent(
            "Please enter both numbers.",
        );
    }); 

    it("shows a successful result and adds it to history", async () => {
        const user = userEvent.setup();

        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ result: 15 }),
        });

        vi.stubGlobal("fetch", fetchMock);

        render(<App />);

        await user.type(
            screen.getByRole("spinbutton", { name: /^first number$/i }),
            "10",
        );

        await user.type(
            screen.getByRole("spinbutton", { name: /^second number$/i }),
            "5",
        );

        await user.click(
            screen.getByRole("button", { name: /^calculate$/i }),
        );

        expect(await screen.findByRole("status")).toHaveTextContent("Result: 15");

        expect(screen.getByRole("listitem")).toHaveTextContent("10 + 5 = 15");
        });

    it("shows an API error when division by zero is attempted", async () => {
        const user = userEvent.setup();

        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ error: "cannot divide by zero" }),
            }),
        );

        render(<App />);

        await user.type(
            screen.getByRole("spinbutton", { name: /^first number$/i }),
            "10",
        );

        await user.selectOptions(
            screen.getByLabelText(/operation/i),
            "divide",
        );

        await user.type(
            screen.getByRole("spinbutton", { name: /^second number$/i }),
            "0",
        );

        await user.click(
            screen.getByRole("button", { name: /^calculate$/i }),
        );

        expect(await screen.findByRole("alert")).toHaveTextContent(
            "cannot divide by zero",
        );

        expect(
            screen.queryByRole("status"),
        ).not.toBeInTheDocument();
        });

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