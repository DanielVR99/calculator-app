package main

import "testing"

func TestCalculate(t *testing.T) {
	tests := []struct {
		name          string
		a             float64
		b             float64
		operation     string
		expected      float64
		expectAnError bool
	}{
		{
			name:      "adds two numbers",
			a:         10,
			b:         5,
			operation: "add",
			expected:  15,
		},
		{
			name:      "subtracts two numbers",
			a:         10,
			b:         5,
			operation: "subtract",
			expected:  5,
		},
		{
			name:      "multiplies two numbers",
			a:         10,
			b:         5,
			operation: "multiply",
			expected:  50,
		},
		{
			name:      "divides two numbers",
			a:         10,
			b:         5,
			operation: "divide",
			expected:  2,
		},
		{
			name:          "rejects division by zero",
			a:             10,
			b:             0,
			operation:     "divide",
			expectAnError: true,
		},
		{
			name:          "rejects an invalid operation",
			a:             10,
			b:             5,
			operation:     "unknown",
			expectAnError: true,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			result, err := calculate(test.a, test.b, test.operation)

			if test.expectAnError {
				if err == nil {
					t.Fatal("expected an error, but got nil")
				}

				return
			}

			if err != nil {
				t.Fatalf("did not expect an error, but got: %v", err)
			}

			if result != test.expected {
				t.Errorf("expected %v, got %v", test.expected, result)
			}
		})
	}
}
