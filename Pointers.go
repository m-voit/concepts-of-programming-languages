package main

import "fmt"

func main() {
	var a, b = 1, 2

	swapIntegerVariables(&a, &b)

	println("Swapped variables:", a, b)

	pA, pB := &a, &b

	swapIntegerPointers(&pA, &pB)

	println("Swapped pointers:", a, b)
}

func swapIntegerVariables(a *int, b *int) {
	*a, *b = *b, *a
}

func swapIntegerPointers(a **int, b **int) {
	*a, *b = *b, *a
}
