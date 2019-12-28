# Compare functional programming in Go with JavaScript

This paper compares functional programming in Go with functional programming in JavaScript.
It compares the type system, functions and functional programming in Go with JavaScript.
Furthermore, an implementation of a parser for Boolean expressions is used as a practical example to compare functional programming in the two programming languages.
At the end of the paper there will be an evaluation and summary on how suitable JavaScript is to implement a functional parser.
However, the main goal of this paper is to show the possibilities and support of functional programming concepts in JavaScript.

## Table of contents

<!-- TODO -->
<!-- Monads -->

## JavaScript Overview

JavaScript is a multi-paradigm programming language and a core technology of the internet.
It is a general purpose programming language and runs in the browser as well as on the server.
Despite often deceived as an object-oriented programming language, JavaScript also follows functional and imperative paradigms.
JavaScript is also event-driven and has good support for asynchronous programming [moz01].

Interestingly, the original plan of Netscape was to integrate Scheme, a Lisp dialect with functional paradigm, into their browser.
But because of marketing reasons, it was decided, to create a new language with syntax similar to Java.
Later the newly created language was called JavaScript and integrated into the Netscape browser.
While being a new language, JavaScript has taken functional concepts of Scheme and integrated them in to the language, besides the imperative and object-oriented paradigms [ant16].

However, to stay within the scope of this paper, the focus will be on the functional aspects of JavaScript. These will be presented in the following sections.

## Parser for Boolean expressions

The parser for Boolean expressions is a practical example to compare functional programming in Go and JavaScript.
It is implemented using functional programming concepts and will be used to provide code examples for various functional programming aspects discussed later.
Generally speaking the parser is built using parser combinators, which are suited to be implemented with functional programming.
The parser parses Boolean expressions with the following EBNF grammar.

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
The expression is parsed by building an abstract syntax tree (AST), consisting of `Or`, `And`, `Not` and `Value` nodes, mimicking the EBNF grammar.

## Functional programming concepts

Functional programming and the functional programming paradigm, consist of various concepts.
To see how well JavaScript and Go are suited for functional programming, we will take a look on these concepts and their support in both languages.

### Type system

JavaScript is a dynamic and weakly typed programming language, that also features duck-typing.
Because the language is weakly typed, types are implicitly cast depending on the used operation.
Furthermore, the dynamic typing allows for types to change their type at runtime, when their assigned value changes [moz05].

In the context of functional programming, the dynamic and weakly typing of JavaScript allows for writing easily reusable functions.
This is especially useful for higher order functions and function composition, because there is no need to do frequent type casts or using `any` types.

```javascript
text = "Hello World!"; // Type of text is string.
text = 5; // Type of text now is number.
```

In go the type system doesn't have generic types, so we have to use an empty interface to simulate an `any` type.
This makes the code more verbose and less readable than JavaScript code, while providing no benefit to the developer.
Generally speaking, the Go type system is not tailored to functional programming and is more or less a hurdle to the developer.

A problem of using empty interfaces to simulate generic types is a hit on performance, when doing many type conversions.
This is no problem in the small parser example, but might become one at a larger scale and should therefore be mentioned [she17].

However, by using empty interfaces, it's still possible to write flexible and reusable functions in Go.

```go
TODO
```

### Immutability

Immutability is a desired property, especially in functional programming, because it reduces unintended side effects.

<!-- Add explanation. -->

Unfortunately, true immutability as desired by functional programming, can't be achieved in JavaScript.
Although it's possible to create constructs that are sort of immutable, there is no immutability like in pure functional programming languages.

```javascript
const a = "Hello";
a = "World"; // Not possible.

const a = { name: "Hello" };
a.name = "World"; // Still possible.
```

In JavaScript there are some ways to achieve immutability like the `const` keyword, introduced with ES6, that allows to define constant variables.
While `const` allows defining constant primitive types as strings, objects created with the `const` keyword are still mutable.
This is the case, because properties of constant objects, can still be reassigned after creation [moz07].

It's also possible to _freeze_ an object after creation.
This makes the object immutable, but still has the caveat, that it doesn't effect nested objects.
Therefore, it's necessary to call freeze recursively on an object that should be immutable [moz08].

But this is more like a workaround than true immutability provided by the language.
Furthermore, it's error prone to developer mistakes and may not play nicely with libraries, that expect mutable objects.

```go
TODO
```

In Go immutability is quite similar to JavaScript and can't be easily achieved.
Except strings, data types in Go are by default mutable and only primitive data types like `bool` and `int` can declared to be constant.
Immutability of composite data types like Go's `structs` is the responsibility of the developer.

For Go Version 2, there is a proposal to introduce immutable data types to Go.
So the state of immutability in Go might change in the future, when Go Version 2 is released [git01].

To sum it up, as of today there is some support for immutability in JavaScript in Go, but not by default and not easily usable.

### First class functions

First class functions are the foundation of supporting functional paradigms in a programming language.
A language with first class functions has to meet the following criteria:

- Allow passing functions as parameters to other functions.
- Allow functions to be return values of other functions, so that functions can return functions.
- Allow functions to be assigned to variables.
- Allow functions to be stored in data structures like arrays.

The listed properties also allow for concepts such as higher-order functions and functional composition, which both are described later.

In JavaScript, all the mentioned properties are supported.
Therefore, functions in JavaScript are first class functions and are treated like first-class citizens in the programming language [moz06][fog13].
This allows it to assign the `optional()` and the `expectSeveral()` function to the `expectSpaces` variable.

```javascript
/**
 * Parse [ \t\n\r]* from the Input.
 */
const expectSpaces = () => optional(expectSeveral(isSpaceChar, isSpaceChar));
```

The same holds true for Go, that supports first class functions as well as JavaScript [she17][gol01].
Like in JavaScript it's possible to assign the `ExpectSeveral()` and the `Optional()` function to the `ExpectSpaces` variable.
The only difference is the chaining of the function calls instead of nesting them and the explicit `Parser` type of the variable.

```go
// ExpectSpaces parses a [ \t\n\r]* from the Input.
var ExpectSpaces Parser = ExpectSeveral(isSpaceChar, isSpaceChar).Optional()
```

### Closures and lambda expressions

Closures and lambda expression, also called anonymous functions, are unnamed functions, often returned from another function.
To be precise, a closure is the reference to the local state of the function, that returns an anonymous function.
However, both terms are often used interchangeably, because both concepts belong to the concept of anonymous functions returned by an outer function [fog13].

Support for closures is found in all programming languages with first class functions.
This is the case, because closures are needed for anonymous functions to work.
Without closures and therefore no references to the _outer_ function, that is returning the _inner_ function, the _inner_ function would stop working when being called directly [moz02][fog13].

```javascript
const sum = (arg1, arg2) => {
  return arg1 + arg2;
};
```

In JavaScript lambda expressions can be written very concisely with the arrow functions syntax, introduced with ECMAScript 6 [moz04].

```go
TODO
```

In Go lambda expressions are a bit more verbose, especially because the type system requires explicit types as mentioned in the type system section earlier.
Otherwise, lambda expressions in Go are equal to lambda expressions in JavaScript [she17].

### Higher-order functions and function composition

Higher-order functions are functions that accept other functions as arguments or return a function as their result.
As discussed in the first class functions section, JavaScript has first class functions and therefore allows writing and using higher-order functions.

The convert function of the Boolean parser for example takes two arguments.
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
Again the reason for this is the different type system of JavaScript and Go as discussed earlier [med02][she17].

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
It's easy and straight forward to use various functions to build complex functions.

In Go, function composition requires the programmer to use empty interfaces.
This is required by Go type system as discussed earlier.

### Pure functions

Pure functions are functions that have no side effects and no hidden inner state.
This means, a function, given the same input, always produces the same output.
To achieve this a pure function only uses its input and doesn't use or mutate internal state.

<!-- Referential transparency -->

JavaScript allows writing pure functions, but doesn't have special constructs to enforce side effect free and pure functions [fog13].

The same holds true for Go.
Like in JavaScript, it's possible writing pure and side effect free functions in Go, but there are no special constructs to enforce these concepts.
Furthermore, because Go doesn't support tail-call optimization, which is discussed later, there are performance impacts, when using pure functions excessively.
So as long as there is no tail-call optimization in Go, pure functions should be used with precautions [she17].

Therefore, pure functions are possible in both languages, but it's in the hand of the programmer writing them.

### Lazy evaluation

There are two ways to evaluate functions, eager and lazy evaluation.
Programming languages that use eager evaluation, evaluate a function as soon as it's assigned or defined.
Lazy evaluation, on the other hand, means that functions are evaluated when they are executed, which may happen much later than the assignment.

In the context of functional programming, lazy evaluation is useful for performance optimization.
This is possible, because functions are only evaluated, when they are actually used and therefore no unnecessary calculations are done.

Unfortunately both, Go and JavaScript, use eager evaluation for functions with no built-in support for lazy evaluation.
However, it's possible to simulate lazy evaluation in both languages, but it's no fundamental part of the two programming languages.

### Recursion and tail-call optimization

To avoid mutating state functional programming uses recursion.
This happens when a function calls itself with new parameters to compute something instead of mutating state inside the function.
Unfortunately recursion is less efficient than iteration, especially when used excessively.

A technique to remedy the performance issues of recursion is called tail-call optimization.
Without tail-call optimization each recursive call to a function adds a new stack frame to the call stack.
This lets the call stack grow with each function call and causes large memory usage on deeply nested recursion calls.
Tail-call optimization prevents this and is therefore an important to allow efficient functional programming.

Tail-call optimization is part of JavaScript since ECMAScript 6, which was introduced in 2015.
This allows efficient functional programming in JavaScript.

Go has no support for tail-call implementation.
This means that heavy using of recursion and functional programming will have an impact on performance.x
There are some possible workarounds for this issue, but these are out of the scope of this paper.[med02][she17]

### Pattern matching

JavaScript might get it. There is a stage 1 proposal.
No support in Go.

### Algebraic data types

<!-- Sum/Product types, discriminate unions -->

Not possible with JavaScript, but with typescript a JavaScript superset.
No support in Go.

## Summary

<!-- How good is functional JavaScript suited to implement a parser? -->

## References

- [ant16] JavaScript: Functional Programming for JavaScript Developers, Ved Antani; Simon Timms; Dan Mantyla, Packt Publishing, 2016-08-31
- [fog13] Functional JavaScript, Michael Fogus, O'Reilly Media, Inc., 2013-06-10
- [git01] proposal: Go 2: immutable type qualifier <https://github.com/golang/go/issues/27975> (viewed 2019-12-26)
- [git02] ECMAScript Pattern Matching <https://github.com/tc39/proposal-pattern-matching> (viewed 2019-12-27)
- [gol01] Codewalk: First-Class Functions in Go <https://golang.org/doc/codewalk/functions/> (viewed 2019-12-26)
- [ker17] Mastering Javascript Functional Programming, Federico Kereki, Packt Publishing, 2017-12-29
- [med01] Introduction to Functional JavaScript, <https://medium.com/functional-javascript/introduction-to-functional-javascript-45a9dca6c64a> (viewed 2019-12-21)
- [med02] Functional Go <https://medium.com/@geisonfgfg/functional-go-bc116f4c96a4> (viewed 2019-12-26)
- [moz01] MDN JavaScript, <https://developer.mozilla.org/en-US/docs/Web/JavaScript> (viewed 2019-12-25)
- [moz02] MDN Closures, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures> (viewed 2019-12-23)
- [moz03] MDN Functions, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions> (viewed 2019-12-25)
- [moz04] MDN Arrow function expressions, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions> (viewed 2019-12-25)
- [moz05] MDN JavaScript data types and data structures, <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures> (viewed 2019-12-25)
- [moz06] MDN First-class Function <https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function> (viewed 2019-12-25)
- [moz07] MDN const <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const> (viewed 2019-12-26)
- [moz08] MDN Object.freeze() <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze> (viewed 2019-12-26)
- [she17] Learning Functional Programming in Go, Lex Sheehan, Packt Publishing, 2017-11-24
