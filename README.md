# Concepts of programming languages

![parser-js-ci](https://github.com/m-voit/concepts-of-programming-languages/workflows/parser-js-ci/badge.svg)

Study project to compare functional programming concepts in Go and JavaScript.
It was developed as part of a Computer Science (Master’s Degree) course at Rosenheim Technical University of Applied Sciences.

The paper written in this study project is based on a parser for Boolean expressions developed in Go and JavaScript using parser combiners.
The Boolean expression parser was then used to compare the support of functional programming concepts in the two programming languages.

## Paper

[Compare functional programming in Go with JavaScript](../blob/master/study-project/paper.md)

## Setup and requirements

A running installation of Node.js 14.x is assumed. Other versions may work, but were not tested.

- Run `npm install` to install dependencies required for running the tests.

## Usage

Open a terminal in the directory `./study-project/parser-js`.

- Run `npm run test` to execute the tests.
- Run `npm run test:coverage` to get a test coverage report.

The output of the tests show an example of Boolean expressions the JavaScript implementation of the parser can parse.
