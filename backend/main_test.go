package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCalculateHandlerReturnsResult(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodGet,
		"/api/calculate?a=10&b=5&operation=add",
		nil,
	)

	recorder := httptest.NewRecorder()

	calculateHandler(recorder, request)

	response := recorder.Result()
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		t.Errorf("expected status %d, got %d", http.StatusOK, response.StatusCode)
	}

	var body CalculationResponse
	err := json.NewDecoder(response.Body).Decode(&body)
	if err != nil {
		t.Fatalf("could not decode response body: %v", err)
	}

	if body.Result != 15 {
		t.Errorf("expected result 15, got %v", body.Result)
	}
}

func TestCalculateHandlerRejectsDivisionByZero(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodGet,
		"/api/calculate?a=10&b=0&operation=divide",
		nil,
	)

	recorder := httptest.NewRecorder()

	calculateHandler(recorder, request)

	response := recorder.Result()
	defer response.Body.Close()

	if response.StatusCode != http.StatusBadRequest {
		t.Errorf(
			"expected status %d, got %d",
			http.StatusBadRequest,
			response.StatusCode,
		)
	}

	var body ErrorResponse
	err := json.NewDecoder(response.Body).Decode(&body)
	if err != nil {
		t.Fatalf("could not decode response body: %v", err)
	}

	if body.Error != "cannot divide by zero" {
		t.Errorf("expected division-by-zero message, got %q", body.Error)
	}
}

func TestCalculateHandlerRejectsPostMethod(t *testing.T) {
	request := httptest.NewRequest(
		http.MethodPost,
		"/api/calculate",
		nil,
	)

	recorder := httptest.NewRecorder()

	calculateHandler(recorder, request)

	response := recorder.Result()
	defer response.Body.Close()

	if response.StatusCode != http.StatusMethodNotAllowed {
		t.Errorf(
			"expected status %d, got %d",
			http.StatusMethodNotAllowed,
			response.StatusCode,
		)
	}

	var body ErrorResponse
	err := json.NewDecoder(response.Body).Decode(&body)
	if err != nil {
		t.Fatalf("could not decode response body: %v", err)
	}

	if body.Error != "Method not allowed. Use GET" {
		t.Errorf("expected method not allowed message, got %q", body.Error)
	}
}
