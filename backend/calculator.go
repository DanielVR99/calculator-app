package main

import (
	"errors"
	"math"
)

func calculate(a float64, b float64, operation string) (float64, error) {
	switch operation {
	case "add":
		return a + b, nil
	case "subtract":
		return a - b, nil
	case "multiply":
		return a * b, nil
	case "divide":
		if b == 0 {
			return 0, errors.New("cannot divide by zero")
		}
		return a / b, nil
	case "power":
		return math.Round(math.Pow(a, b)*100) / 100, nil
	case "sqrt":
		if a < 0 {
			return 0, errors.New("cannot take square root of negative number")
		}
		return math.Round(math.Sqrt(a)*100) / 100, nil
	default:
		return 0, errors.New("invalid operation")
	}
}
