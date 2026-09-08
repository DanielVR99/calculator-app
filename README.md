# Full-Stack Calculator

A full-stack calculator application built with a React + TypeScript frontend and a Go REST API backend.

It supports basic arithmetic operations, plus exponentiation and square root.

## Features

* Addition, subtraction, multiplication, and division
* Exponentiation and square root
* Backend validation for invalid numbers, invalid operations, negative square roots, and division by zero
* Frontend validation and user-friendly error messages
* Responsive interface
* Calculation history with clear-history action
* Swap button for operations that use two numbers
* Unit tests for backend logic, HTTP handlers, and frontend behavior
* CORS support for local React development

## Tech stack

* Frontend: React, TypeScript, Vite
* Backend: Go standard library (`net/http`)
* Testing: Go `testing` package, Vitest, React Testing Library

## Project structure

```text
calculator-app/
├── backend/
│   ├── main.go
│   ├── calculator.go
│   ├── calculator_test.go
│   ├── main_test.go
│   └── go.mod
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.test.tsx
│   │   └── test/setup.ts
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## Prerequisites

Install the following tools:

* [Go](https://go.dev/)
* [Node.js](https://nodejs.org/)

On macOS with Homebrew:

```bash
brew install go node
```

Verify the installations:

```bash
go version
node --version
npm --version
```

## Run the backend

From the project root:

```bash
cd backend
go run .
```

The API will run at:

```text
http://localhost:8080
```

## Run the frontend

Open another terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the URL displayed by Vite, usually:

```text
http://localhost:5173
```

Keep both the frontend and backend running during local development.

## API usage

### Endpoint

```text
GET /api/calculate
```

### Query parameters

| Parameter   | Description          | Required               |
| ----------- | -------------------- | ---------------------- |
| `a`         | First number         | Yes                    |
| `b`         | Second number        | Yes                    |
| `operation` | Calculator operation | Yes                    |

### Supported operations

| Operation  | Example       |
| ---------- | ------------- |
| `add`      | `10 + 5 = 15` |
| `subtract` | `10 - 5 = 5`  |
| `multiply` | `10 × 5 = 50` |
| `divide`   | `10 ÷ 5 = 2`  |
| `power`    | `2 ^ 3 = 8`   |
| `sqrt`     | `√25 = 5`     |

### API examples

Addition:

```bash
curl "http://localhost:8080/api/calculate?a=10&b=5&operation=add"
```

Response:

```json
{
  "result": 15
}
```

Exponentiation:

```bash
curl "http://localhost:8080/api/calculate?a=2&b=3&operation=power"
```

Square root:

```bash
curl "http://localhost:8080/api/calculate?a=25&b=0&operation=sqrt"
```

Division by zero:

```bash
curl "http://localhost:8080/api/calculate?a=10&b=0&operation=divide"
```

Response:

```json
{
  "error": "cannot divide by zero"
}
```

The API only accepts `GET` requests. Unsupported methods return `405 Method Not Allowed`.

## Tests

### Backend tests

From `backend`:

```bash
go test -v ./...
```

Generate a backend coverage report:

```bash
go test -coverprofile=coverage.out ./...
go tool cover -func=coverage.out
```

### Frontend tests

From `frontend`:

```bash
npm test
```

Frontend tests cover:

* Hiding the second input for square root
* Validation when required inputs are empty
* Successful API responses and calculation history
* API error responses, including division by zero

### Build the frontend

```bash
cd frontend
npm run build
```

## Design decisions

* **Go standard library:** The backend uses `net/http` instead of an external framework to keep the API small, readable, and easy to test.
* **Separated calculator logic:** Calculation logic lives separately from HTTP handling so it can be tested without starting a server.
* **Validation in both layers:** The frontend provides immediate feedback, while the backend remains the source of truth and validates all requests.
* **REST API:** A simple `GET` endpoint is appropriate because calculations are stateless and do not modify server data.
* **CORS:** The backend allows requests from `http://localhost:5173` for Vite development.
* **React state:** Inputs, loading state, errors, results, and calculation history are managed with React `useState`.
* **History is client-side:** Calculation history is intentionally kept in the browser session and is cleared on page refresh.

## AI prompts used

AI assistance was used for learning and implementation guidance. Example prompts included:

* “Help me create unit tests for the Go calculator API.”
* “Help me add CORS and restrict the API to GET requests.”
* “Help me to frontend tests.”

## Repository

[GitHub repository](https://github.com/DanielVR99/calculator-app)
