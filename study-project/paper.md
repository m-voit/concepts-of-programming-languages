# Compare functional programming in Go with JavaScript

This paper compares functional programming in Go with functional programming in JavaScript.
It compares the type system, functions and functional programming in Go with JavaScript.
Furthermore, an implementation of a parser for boolean expressions is used as a practical example to compare functional programming in the two programming languages.
The main goal of this paper is to show the possibilities and the support of functional programming concepts in JavaScript.

## Table of contents

<!-- TODO -->
<!-- Monads -->
<!-- Currying -->

## JavaScript Overview

JavaScript is a multi-paradigm programming language and a core technology of the internet.
It is a general purpose programming language and runs in the browser as well as on the server.
Despite often deceived as an object-oriented programming language, JavaScript also follows functional and imperative paradigms.
JavaScript is also event-driven and has good support for asynchronous programming [wik01].
<!-- TODO Maybe take a look at the history of js. Scheme etc. -->
However, to stay in the scope of this paper, we will concentrate on the functional aspects of JavaScript, which will be presented in the following paragraphs.

## Parser for boolean expressions

The parser parses boolean expressions with the following EBNF form.

```
<expression> ::= <term> { <or> <term> }
<term> ::= <factor> { <and> <factor> }
<factor> ::= <var> | <not> <factor> | (<expression>)
<or>  ::= '|'
<and> ::= '&'
<not> ::= '!'
<var> ::= '[a-zA-Z0-9]*'
```

A valid expression would be `A & B | !C` which means A and B or not C.
Consists of an ast, parser and boolean parser.

### Type system

JavaScript is a dynamic and weakly typed programming language, that also features duck-typing.
Because the language is weakly typed, types are implicitly cast depending on the used operation.
Furthermore, the dynamic typing allows for types to change their type at runtime, when their assigned value changes.

In the context of functional programming, the dynamic and weakly typing of JavaScript allows for writing easily reusable functions.
This is especially useful for higher order functions and function composition, because there is no need to do type casts or simulating `any` types.

```javascript
text = "Hello World!"; // Type of text is string.
text = 5; // Type of text is now number.
```

### Functional programming concepts

An important part of functional programming capabilities of a programming language are functions and how they are supported in a programming language.
As we are taking a look at JavaScript, we will see how JavaScript supports several important functional programming concepts.

#### First class functions

First class functions are the foundation of supporting functional paradigms in a programming language.
A language with first class functions has to meet the following criteria:

- Allow passing functions as parameters to other functions.
- Allow functions to be return values of other functions, so that functions can return functions.
- Allow functions to be assigned to variables.
- Allow functions to be stored in data structures like arrays.

The listed properties also allow for concepts as higher-order functions and functional composition, which both are described later.
In JavaScript, all the mentioned properties are supported.
Therefore, functions in JavaScript are first class functions and are treated like first-class citizens in the programming language.

```javascript
/**
 * Parse [ \t\n\r]* from the Input.
 */
const expectSpaces = () => optional(expectSeveral(isSpaceChar, isSpaceChar));
```

```go
// ExpectSpaces parses a [ \t\n\r]* from the Input.
var ExpectSpaces Parser = ExpectSeveral(isSpaceChar, isSpaceChar).Optional()
```

#### Higher-order functions

Higher-order functions are functions that accept other functions arguments or return a function as result.
The convert function of the boolean parser for example takes two arguments.
A parser function to be executed and a converter function to convert the result of the parser function.
This higher order function can now be used for any desired parser function and with an arbitrary converter function.
The result is a highly flexible and easily reusable function.

```javascript
/**
 * Apply the converter to the result of a successful parse.
 * If the parser fails then do nothing.
 *
 * @param {any} parser The parser.
 * @param {any} converter A function to be applied to the parser result.
 * @returns Result.
 */
const convert = (parser, converter) => input => {
  const result = parser(input);

  if (result.result !== null) {
    result.result = converter(result.result);
  }

  return result;
};
```

In Go, the converter function looks similar to the JavaScript implementation.
This is the case, because Go has similar support for higher-order functions as JavaScript.
The main differences between the Go and the JavaScript implementation are the empty interfaces to satisfy the Go compiler and the higher verbosity of the Go code.

```go
// Convert applies the converter to the result of a successful parse.
// If the parser fails then Convert won't do anything.
func (parser Parser) Convert(converter func(interface{}) interface{}) Parser {
	return func(Input Input) Result {
    var result = parser(Input)

		if result.Result != nil {
			result.Result = converter(result.Result)
    }

		return result
	}
}
```

#### Function composition

Function composition is a concept that allows to build complex functions out of one or more simple functions.
Working in JS because of the type system.

```javascript
f(args) {}
g() {}

f(g());
```

In Go, it requires you to use empty interfaces.

#### Pure functions

Pure functions are functions that have no side effects.
This means a function, given the same input, always produces the same output.
To achieve this a pure function only uses its input and doesn't mutate internal state.
JavaScript allows writing pure functions, but doesn't have special constructs to enforce side effect free programming.

### Lazy evaluation

Lazy evaluation is a

### Closures and Lambda Expressions

Closures are needed.

<!-- ES6 arrow functions -->

```javascript
const sum = (arg1, arg2) => {
  return arg1 + arg2;
};
```

### Immutability

Immutability as desired by functional programming can't be achieved in JavaScript.
Although it's possible to create constructs that are sort of immutable, there is no true immutability like in true function programming languages.
In JavaScript there are some ways to achieve immutability like the `const` keyword, introduced with ES6, that allows to define constant variables.

<!-- ES6 const keyword -->

```javascript
const a = "Hello";
a = "World"; // Throws an error.
```

### Pattern matching

JavaScript might get it with Proposal XY.
No support in Go.

### Sum/product types

JS not know yet.
No support in Go.

## Summary

<!-- How good is functional JavaScript suited to implement a parser? -->

## References

- [med01] <https://medium.com/functional-javascript/introduction-to-functional-javascript-45a9dca6c64a> (viewed 2019-12-21)
- [moz01] <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures> (viewed 2019-12-23)
- [fed17] Mastering Javascript Functional Programming, Federico Kereki, Packt Publishing, 2017-12-29
