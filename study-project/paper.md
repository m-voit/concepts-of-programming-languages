# Compare functional programming in Go with JavaScript

This paper compares functional programming in Go with functional programming in JavaScript.
It compares the type system, functions and functional programming in Go with JavaScript.
Furthermore, an implementation of a parser for boolean expressions is used as a practical example to compare functional programming in the two programming languages.
At the end of the paper there will be an evaluation and summary on how suitable JavaScript is to implement a functional parser.
However, the main goal of this paper is to show the possibilities and support of functional programming concepts in JavaScript.

## Table of contents

<!-- TODO -->
<!-- Monads -->

## JavaScript Overview

JavaScript is a multi-paradigm programming language and a core technology of the internet.
It is a general purpose programming language and runs in the browser as well as on the server.
Despite often deceived as an object-oriented programming language, JavaScript also follows functional and imperative paradigms.
JavaScript is also event-driven and has good support for asynchronous programming [moz01][ant16].

Interestingly, the original plan of Netscape was to integrate Scheme, a Lisp dialect with functional paradigm, into their browser.
But because of marketing reasons, it was decided, to create a new language with syntax similar to Java.
Later the newly created language was called JavaScript and integrated into the Netscape browser.
While being a new language, JavaScript has taken the functional concepts of Scheme and integrated them, beside the other supported paradigms.

However, to stay within the scope of this paper, the focus will be on the functional aspects of JavaScript, which will be presented in the following sections.

## Parser for boolean expressions

The parser for boolean expressions is a practical example to compare functional programming in Go and JavaScript.
It is implemented using functional programming concepts and will be used to provide code examples for various functional programming aspects discussed later.
Generally speaking the parser is built using parser combinators, which are suited to be implemented with functional programming.
The parser parses boolean expressions with the following EBNF grammar.

```ebnf
<expression> ::= <term> { <or> <term> }
<term> ::= <factor> { <and> <factor> }
<factor> ::= <var> | <not> <factor> | (<expression>)
<or>  ::= '|'
<and> ::= '&'
<not> ::= '!'
<var> ::= '[a-zA-Z0-9]*'
```

A valid expression to be parsed by the parser would be `A & B | !C`.
Depending on the values of A, B and C, which can be true or false, the parser determines the result of the expression.
The expression is parsed by building an abstract syntax tree (AST), consisting of `Or`, `And`, `Not` and `Value` nodes, that mimic the EBNF grammar.

## Functional programming concepts

Functional programming and the functional programming paradigm, consist of various concepts.
To see how well JavaScript and Go are suited for functional programming, we will take a look on these concepts and their support in both languages.

### Type system

JavaScript is a dynamic and weakly typed programming language, that also features duck-typing.
Because the language is weakly typed, types are implicitly cast depending on the used operation.
Furthermore, the dynamic typing allows for types to change their type at runtime, when their assigned value changes.

In the context of functional programming, the dynamic and weakly typing of JavaScript allows for writing easily reusable functions.
This is especially useful for higher order functions and function composition, because there is no need to do type casts or simulating `any` types.

```javascript
text = "Hello World!"; // Type of text is string.
text = 5; // Type of text now is number.
```

In go the type system doesn't have generic types, so we have to use an empty interface to simulate an `any` type.
This makes the code more verbose and less readable than JavaScript code.
So this is no part where Go shines.
However, by using empty interfaces in go, it's possible to write flexible and reusable functions.

```go
TODO
```

### Immutability

True immutability as desired by functional programming can't be achieved in JavaScript.
Although it's possible to create constructs that are sort of immutable, there is no true immutability like in functional only programming languages.

```javascript
const a = "Hello";
a = "World"; // Not possible.

const a = { name: "Hello" };
a.name = "World"; // Still possible.
```

In JavaScript there are some ways to achieve immutability like the `const` keyword, introduced with ES6, that allows to define constant variables.
While `const` allows defining constant primitive types as strings, objects created with the `const` keyword are still mutable.
This is the case, because properties of constant objects, can still be reassigned after creation.

<!-- Object deep freeze. -->

```go
TODO
```

In Go immutability is quite similar to JavaScript.
Except strings, data types in Go are by default mutable and only primitive data types like `bool` and `int` can declared to be constant.
Immutability of composite data types like Go's `structs` is the responsibility of the developer.

To sum it up, there is some support for immutability in JavaScript in Go, but not enough to satisfy the functional paradigm.

### First class functions

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

### Closures and lambda expressions

Closures and lambda expression, also called anonymous functions, are unnamed functions, often returned from another function.
To be precise, a closure is the reference to the local state of the function, returning an anonymous function.
Closures are found in all programming languages with first class functions [moz02].

```javascript
const sum = (arg1, arg2) => {
  return arg1 + arg2;
};
```

In JavaScript lambda expressions can be written very concise with the arrow functions syntax, introduced in ES6 [moz04].

```go
TODO
```

In Go lambda expressions are a bit more verbose, especially because the type system requires explicit types.
Otherwise lambda expessions in Go are equal to lambda expressions in JavaScript.

### Higher-order functions and function composition

Higher-order functions are functions that accept other functions arguments or return a function as result.
As discussed, JavaScript has first class functions, which allows using higher-order functions.

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
The main differences between the Go and the JavaScript implementation are the empty interfaces to satisfy the Go type system and the higher verbosity of the Go code.

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

Function composition is a concept that allows to build complex functions out of one or more simple functions.
<!-- Currying -->

Function composition works good with JavaScript, especially because of the permissive type system, discussed earlier.
It's easy in straight forward to use various functions to build complex functions with them.

In Go, function composition requires the programmer to use empty interfaces.
This is required, because of the Go type system as discussed earlier.

### Pure functions

Pure functions are functions that have no side effects and no hidden inner state.
This means, a function, given the same input, always produces the same output.
To achieve this a pure function only uses its input and doesn't use or mutate internal state.
JavaScript allows writing pure functions, but doesn't have special constructs to enforce side effect free programming.

The same holds true for Go.
Like in JavaScript, it's possible writing pure and side effect free functions in Go, but there are no special constructs to enforce this.

Therefore, pure functions are possible in both languages, but it's in the hand of the programmer writing them.

### Lazy evaluation

There are two ways to evaluate functions, eager and lazy evaluation.
Programming languages that use eager evaluation, evaluate a function as soon as it's assigned or defined.
Lazy evaluation, on the other hand, means that functions are evaluated when they are executed, which may happen much later than the assignment.

Both, Go and JavaScript, use eager evaluation for functions.
<!-- TODO Why is this relevant for functional programming -->

### Pattern matching

JavaScript might get it with Proposal XY.
No support in Go.

### Algebraic data types
<!-- Sum/Product types, discriminate unions -->
Not possible with javascript, but with typescript a javascript superset.
No support in Go.

## Summary

<!-- How good is functional JavaScript suited to implement a parser? -->

## References

- [ant16] JavaScript: Functional Programming for JavaScript Developers,Ved Antani; Simon Timms; Dan Mantyla, Packt Publishing, 2016-08-31
- [fog13] Functional JavaScript, Michael Fogus, O'Reilly Media, Inc., 2013-06-10
- [ker17] Mastering Javascript Functional Programming, Federico Kereki, Packt Publishing, 2017-12-29
- [med01] Introduction to Functional JavaScript, <https://medium.com/functional-javascript/introduction-to-functional-javascript-45a9dca6c64a> (viewed 2019-12-21)
- [moz01] MDN JavaScript, <https://developer.mozilla.org/en-US/docs/Web/JavaScript> (viewed 2019-12-25)
- [moz02] MDN Closures, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures> (viewed 2019-12-23)
- [moz03] MDN Functions, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions> (viewed 2019-12-25)
- [moz04] MDN Arrow function expressions, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions> (viewed 2019-12-25)
- [moz05] MDN JavaScript data types and data structures, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures> (viewed 2019-12-25)
- [moz06] MDN First-class Function <https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function> (viewed 2019-12-25)
- [she17] Learning Functional Programming in Go, Lex Sheehan, Packt Publishing, 2017-11-24
