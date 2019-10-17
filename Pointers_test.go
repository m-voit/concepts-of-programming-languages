import "testing"

func TestPointers(t *testing.T) {
	a, b = 1, 2
	c, d = 1, 2
	
	t.swapIntegerVariables(a, b)

	if a, b == c, d {
			t.Errorf("a, b = %d, %d; want %d, %d", a, b, c, d)
	}
}