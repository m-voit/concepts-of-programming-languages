# Compare functional programming in Go with JavaScript

This paper compares functional programming in Go with functional programming in JavaScript.
It compares the type system, functions and functional programming in Go with JavaScript.
Furthermore, an implementation of a parser for boolean expressions is used as a practical example to compare functional programming in the two programming languages.
<!-- Paper will answer the question what functional concepts are present in javascript and which possibilities there are. -->

## Table of contents

<!-- TODO -->

## JavaScript Overview

JavaScript is a multi-paradigm programming language and a core technology of the internet.
It is a general purpose programming language and runs in the browser as well as on the server.
Despite often deceived as an object-oriented programming language, JavaScript also follows functional and imperative paradigms.
JavaScript is also event-driven and has good support for asynchronous programming.
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

In the context of functional programming, the dynamic and weakly typing of JavaScript allows writing reusable functions that can accept any input.

<!-- TODO Describe why this helps with functional programming. Untyped lambda calculus. -->

### Functions

An important part of functional programming are of course functions and their support in the programming language.
As we are taking a look at JavaScript, we will see how JavaScript supports several important functional programming concepts.

#### First class functions

First class functions are the foundation of supporting functional paradigms in a programming language.
A language with first class functions has to meet the following criteria:

* Allow passing functions as parameters to other functions.
* Allow functions to be return values of other functions, so that functions can return functions.
* Allow functions to be assigned to variables.
* Allow functions to be stored in data structures like arrays.

The listed properties also allow for concepts such as higher-order functions or functional composition, which both are described later.
In JavaScript, all the mentioned properties are supported.
Therefore, functions in JavaScript are first class functions and are treated like first-class citizens in the programming language.

<!-- TODO Code example. -->
```javascript
// Assign function to variable.
log = function(text) {
  console.log(text);
}

// Call variable as function with a parameter.
log("Hello World!");
```

#### Higher Order Functions

Higher order functions are functions that accept other functions arguments or return a function as result.


#### Function composition

Function composition

#### Pure functions



### Closures and Lambda Expressions

<!-- ES6 arrow functions -->

### Immutability

<!-- ES6 const keyword -->

## Parser for boolean expressions

## Comparison with Go

## Summary

## References

<https://medium.com/functional-javascript/introduction-to-functional-javascript-45a9dca6c64a> (viewed 2019-12-21)
