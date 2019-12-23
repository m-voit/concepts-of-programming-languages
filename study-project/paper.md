# Compare functional programming in Go with JavaScript

This paper compares functional programming in Go with functional programming in JavaScript.
It compares the type system, functions and functional programming in Go with JavaScript.
Furthermore, an implementation of a parser for boolean expressions is used as a practical example to compare functional programming in the two programming languages.
The main goal of this paper is to show the possibilities and the support of functional programming concepts in JavaScript.

<!-- Paper will answer the question what functional concepts are present in javascript and which possibilities there are. -->

## Table of contents

<!-- TODO -->

## JavaScript Overview

JavaScript is a multi-paradigm programming language and a core technology of the internet.
It is a general purpose programming language and runs in the browser as well as on the server.
Despite often deceived as an object-oriented programming language, JavaScript also follows functional and imperative paradigms.
JavaScript is also event-driven and has good support for asynchronous programming [wik01].
However, to stay in the scope of this paper, we will concentrate on the functional aspects of JavaScript, which will be presented in the following paragraphs.

<!-- Functions -->
<!-- Lambdas/closures -->
<!-- Higher order functions -->
<!-- Sum/product types -->
<!-- Immutable types -->
<!-- Pattern matching -->
<!-- Monads -->
<!-- Function literals -->
<!-- Currying -->

### Type system

JavaScript is a dynamic and weakly typed programming language, that also features duck-typing.
Because the language is weakly typed, types are implicitly cast depending on the used operation.
Furthermore, the dynamic typing allows for types to change their type at runtime, when their assigned value changes.

<!-- TODO Code example. -->

```javascript
text = "Hello World!"; // Type of text is string.
text = 5; // Type of text is now number.
```

<!-- TODO Describe why this helps with functional programming. Untyped lambda calculus. -->

In the context of functional programming, the dynamic and weakly typing of JavaScript allows for writing reusable functions that can accept any input.

### Functions

An important part of functional programming capabilities of a programming language are functions and how they are supported in a programming language.
As we are taking a look at JavaScript, we will see how JavaScript supports several important functional programming concepts.

#### First class functions

First class functions are the foundation of supporting functional paradigms in a programming language.
A language with first class functions has to meet the following criteria:

- Allow passing functions as parameters to other functions.
- Allow functions to be return values of other functions, so that functions can return functions.
- Allow functions to be assigned to variables.
- Allow functions to be stored in data structures like arrays.

The listed properties also allow for concepts such as higher-order functions or functional composition, which both are described later.
In JavaScript, all the mentioned properties are supported.
Therefore, functions in JavaScript are first class functions and are treated like first-class citizens in the programming language.

<!-- TODO Code example. -->

```javascript
// Assign function to variable.
sum = function(x, y) {
  return x + y;
};

// Call variable as function with a parameter.
sum(1, 2); // Output 3.
```

#### Higher Order Functions

Higher order functions are functions that accept other functions arguments or return a function as result.
The convert function of the boolean parser for example takes two arguments.
A parser function to be executed and a converter function to convert the result of the parser function.
This higher order function can now be used for any desired parser function and with an arbitrary converter function.
The result is a highly flexible and easily reusable function.

```javascript
/**
 * Apply the converter to the result of a successful parse.
 * If the parser fails then do nothing.
 *
 * @param {any} parser The parser
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

The same converter function in go, looks a lot like the JavaScript implementation.

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

Function composition

```javascript
f(args) {}
g() {}

f(g());
```

#### Pure functions

Pure functions are functions that have no side effects.
This means a function, given the same input, always produces the same output.
To achieve this a pure function only uses its input and doesn't mutate internal state.
JavaScript allows writing pure functions, but doesn't have special constructs to enforce side effect free programming.

### Lazy Evaluation

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
Although it's possible to create constructs that are sort of immutable, there is no true immutability like in Haskell or F#.
ECMA Script 6 introduced the `const` keyword, that allows to define constant variables.

<!-- ES6 const keyword -->

```javascript
const a = "Hello";
a = "World"; // Throws an error.
```

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

### AST

```javascript
class Or {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  evaluate(vars) {
    return this.lhs.evaluate(vars) || this.rhs.evaluate(vars);
  }
}
```

## Comparison with Go

## Summary

## References

- [med01] <https://medium.com/functional-javascript/introduction-to-functional-javascript-45a9dca6c64a> (viewed 2019-12-21)
- [moz01] <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures> (viewed 2019-12-23)
- [fed17] Mastering Javascript Functional Programming, Federico Kereki, Packt Publishing, 2017-12-29
