import { useState, type FormEvent } from "react";
import "./App.css";

type ApiResponse = {
  result?: number;
  error?: string;
};

function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const needsSecondNumber = operation !== "sqrt";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setResult(null);

    if (
      firstNumber.trim() === "" ||
      (needsSecondNumber && secondNumber.trim() === "")) {
        setError("Please enter both numbers.");
        return;
    }

    setIsLoading(true);

    try {
      const url =
        `http://localhost:8080/api/calculate` +
        `?a=${firstNumber}&b=${secondNumber}&operation=${operation}`;

      const response = await fetch(url);
      const data: ApiResponse = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      if (data.result !== undefined) {
        setResult(data.result);
      }
    } catch {
      setError(
        "Could not connect to the calculator API. Check that the Go server is running.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="calculator-page">
      <section className="calculator-card">
        <p className="eyebrow">Full-stack calculator</p>
        <h1>Calculator</h1>
        <p className="description">
          Perform calculations using a React frontend and Go API.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="first-number">First number</label>
          <input
            id="first-number"
            type="number"
            value={firstNumber}
            onChange={(event) => setFirstNumber(event.target.value)}
            placeholder="e.g. 10"
            step="any"
          />

          <label htmlFor="operation">Operation</label>
          <select
            id="operation"
            value={operation}
            onChange={(event) => setOperation(event.target.value)}
          >
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (−)</option>
            <option value="multiply">Multiplication (×)</option>
            <option value="divide">Division (÷)</option>
            <option value="power">Power (^)</option>
            <option value="sqrt">Square Root (√)</option>
          </select>

          {needsSecondNumber && (
            <>
              <label htmlFor="second-number">Second number</label>
              <input
                id="second-number"
                type="number"
                value={secondNumber}
                onChange={(event) => setSecondNumber(event.target.value)}
                placeholder="e.g. 5"
                step="any"
              />
            </>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Calculating..." : "Calculate"}
          </button>
        </form>

        {result !== null && (
          <p className="result" role="status">
            Result: <strong>{result}</strong>
          </p>
        )}

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

export default App;