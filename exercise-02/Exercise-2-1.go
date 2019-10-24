package main

import "fmt"

func main() {
	var a, b = 1, 2

	swapIntegerVariables(&a, &b)

	fmt.Println("Swapped variables:", a, b)

	pA, pB := &a, &b

	swapIntegerPointers(&pA, &pB)

	fmt.Println("Swapped pointers:", pA, pB)
}

func swapIntegerVariables(a *int, b *int) {
	*a, *b = *b, *a
}

func swapIntegerPointers(a **int, b **int) {
	*a, *b = *b, *a
}
