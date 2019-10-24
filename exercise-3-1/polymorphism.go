package polymorphism

import "fmt"

// Position :
type Position struct {
	x, y int
}

// GeoObject :
type GeoObject struct {
	position Position
	color    int
}

// Circle :
type Circle struct {
	GeoObject
	radius int
}

// Rectangle :
type Rectangle struct {
	GeoObject
	width  int
	height int
}

// Triangle :
type Triangle struct {
	GeoObject
	a, b, c Position
}

// Painter :
type Painter interface {
	Paint()
}

// Paint :
func (circle Circle) Paint() {
	fmt.Printf("Painting circle with radius=%v at position=%v and color=%v\n", circle.radius, circle.position, circle.color)
}

// Paint :
func (rectangle Rectangle) Paint() {
	fmt.Printf("Painting rectangle with width=%v, height=%v at position=%v and color=%v\n", rectangle.width, rectangle.height, rectangle.position, rectangle.color)
}

// Paint :
func (triangle Triangle) Paint() {
	fmt.Printf("Painting triangle with a=%v, b=%v, c=%v at position=%v and color=%v\n", triangle.a, triangle.b, triangle.c, triangle.position, triangle.color)
}

func main() {

	objects := []Painter{
		Circle{GeoObject{Position{1, 2}, 3}, 40},
		Rectangle{GeoObject{Position{1, 2}, 4}, 10, 10},
		Triangle{GeoObject{Position{1, 2}, 3}, Position{10, 20}, Position{11, 21}, Position{12, 22}},
	}

	for _, v := range objects {
		v.Paint()
	}

}
