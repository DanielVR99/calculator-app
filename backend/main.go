package main

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type CalculationResponse struct {
	Result float64 `json:"result"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func main() {
	http.HandleFunc("/api/calculate", calculateHandler)

	println("Backend running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

func calculateHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodPost {
		writeError(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	a, err := strconv.ParseFloat(r.URL.Query().Get("a"), 64)
	if err != nil {
		writeError(w, "Parameter 'a' must be a number", http.StatusBadRequest)
		return
	}

	b, err := strconv.ParseFloat(r.URL.Query().Get("b"), 64)
	if err != nil {
		writeError(w, "Parameter 'b' must be a number", http.StatusBadRequest)
		return
	}

	operation := r.URL.Query().Get("operation")

	result, err := calculate(a, b, operation)

	if err != nil {
		writeError(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(CalculationResponse{Result: result})

}

func writeError(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(ErrorResponse{Error: message})
}
