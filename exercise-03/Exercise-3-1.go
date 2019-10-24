package main

import "fmt"

type Position struct {
	x, y int
}

type GeoObject struct {
	position Position
	color    int
}

type Circle struct {
	GeoObject
	radius int
}

type Rectangle struct {
	GeoObject
	width  int
	height int
}

type Triangle struct {
	GeoObject
	a, b, c Position
}

type Painter interface {
	Paint()
}

func (circle Circle) Paint() {
	fmt.Printf("Painting circle with radius=%v at position=%v and color=%v\n", circle.radius, circle.position, circle.color)
}

func (rectangle Rectangle) Paint() {
	fmt.Printf("Painting rectangle with width=%v, height=%v at position=%v and color=%v\n", rectangle.width, rectangle.height, rectangle.position, rectangle.color)
}

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
