![codeql](https://github.com/m-voit/concepts-of-programming-languages/workflows/codeql/badge.svg)
![go-parser](https://github.com/m-voit/concepts-of-programming-languages/workflows/go-parser/badge.svg)
![js-parser](https://github.com/m-voit/concepts-of-programming-languages/workflows/js-parser/badge.svg)

# Concepts of programming languages

Study project to compare functional programming concepts in Go and JavaScript.
It was developed as part of a master's course in computer science at Rosenheim Technical University of Applied Sciences.

## Paper

The paper written as part of this study project is based on a parser for Boolean expressions developed in Go and JavaScript using parser combinators.
The Boolean expression parser was then used to compare the support of functional programming concepts in the two programming languages.

[Compare functional programming in Go with JavaScript](./paper.md)

## Setup and requirements

A running installation of Node.js 14.x is assumed. Other versions may work, but were not tested.

- Run `npm install` to install dependencies required for running the tests.

## Usage

Open a terminal in the directory `./js-parser`.

- Run `npm run test` to execute the tests.
- Run `npm run test:coverage` to get a test coverage report.

The test output shows an example of Boolean expressions the JavaScript implementation of the parser can parse.
