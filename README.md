# Concepts of programming languages

![codeql](https://github.com/m-voit/concepts-of-programming-languages/workflows/codeql/badge.svg)
![go-parser](https://github.com/m-voit/concepts-of-programming-languages/workflows/go-parser/badge.svg)
![js-parser](https://github.com/m-voit/concepts-of-programming-languages/workflows/js-parser/badge.svg)
![publish-js-parser](https://github.com/m-voit/concepts-of-programming-languages/workflows/publish-js-parser/badge.svg)

Study project to compare functional programming concepts in Go and JavaScript.
It was developed as part of a master's course in computer science at Rosenheim Technical University of Applied Sciences.

## Paper

The paper written as part of this study project is based on a parser for Boolean expressions developed in Go and JavaScript using parser combinators.
The Boolean expression parser was then used to compare the support of functional programming concepts in the two programming languages.

[Compare functional programming in Go with JavaScript](./paper.md)

## Go parser requirements and setup

A running installation of Go 1.15 is assumed. Other versions may work, but were not tested.

Open a terminal in the directory `./go-parser`.

- Run `go get -t -d ./...` to get dependencies of the parser.
- Run `go build ./...` to build the parser.

## Go parser usage

Open a terminal in the directory `./js-parser`.

- Run `go test -v ./...` to execute the tests.
- Run `go test -v -cover ./...` to get a test coverage report.

## JavaScript parser requirements and setup

A running installation of Node.js 14.x is assumed. Other versions may work, but were not tested.

Open a terminal in the directory `./js-parser`.

- Run `npm install` to get dependencies of the parser.

## JavaScript parser usage

Open a terminal in the directory `./js-parser`.

- Run `npm run test` to execute the tests.
- Run `npm run test:coverage` to get a test coverage report.

The test output shows an example of Boolean expressions the JavaScript implementation of the parser can parse.
