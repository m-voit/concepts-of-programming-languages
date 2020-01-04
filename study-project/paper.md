# Compare functional programming in Go with JavaScript

This paper compares functional programming in JavaScript with functional programming in Go.
At the beginning, it gives a short overview over JavaScript and it's history.
Furthermore, an implementation of a parser for Boolean expressions is used as a practical example to compare functional programming in the two programming languages.
Additionally, JavaScript and Go are compared on their support of basic and advanced functional programming concepts.
These functional programming concepts are explained and looked at in the paper.
At the end of the paper there will be an evaluation and summary on how suitable JavaScript is to implement a functional parser.

## Table of contents

- [Compare functional programming in Go with JavaScript](#compare-functional-programming-in-go-with-javascript)
  - [Table of contents](#table-of-contents)
  - [JavaScript Overview](#javascript-overview)
  - [Parser for Boolean expressions](#parser-for-boolean-expressions)
  - [Functional programming concepts](#functional-programming-concepts)
    - [Type system](#type-system)
    - [Immutability](#immutability)
    - [First class functions](#first-class-functions)
    - [Closures and lambda expressions](#closures-and-lambda-expressions)
    - [Higher-order functions and function composition](#higher-order-functions-and-function-composition)
    - [Pure functions](#pure-functions)
    - [Lazy evaluation](#lazy-evaluation)
    - [Recursion and tail-call optimization](#recursion-and-tail-call-optimization)
    - [Algebraic data types](#algebraic-data-types)
    - [Pattern matching](#pattern-matching)
  - [Summary](#summary)
  - [References](#references)

## JavaScript Overview

JavaScript is a multi-paradigm programming language and a core technology of the internet.
It is a general purpose programming language and runs in the browser as well as on the server.
Despite often deceived as an object-oriented programming language, JavaScript also follows functional and imperative paradigms.
JavaScript is also event-driven and has good support for asynchronous programming [moz01].

Interestingly, the original plan of Netscape was to integrate Scheme, a Lisp dialect, into their browser.
But for marketing reasons, it was decided, to create a new language with a syntax similar to Java.
Later the newly created language was called JavaScript and integrated into the Netscape browser.
While being a new language, JavaScript has taken the functional concepts of Scheme and integrated them in to the language, besides imperative and object-oriented concepts [ant16].

However, to stay within the scope of this paper, the focus will be on the functional aspects of JavaScript. These will be presented in the following sections.

## Parser for Boolean expressions

The parser for Boolean expressions is a practical example to compare functional programming in Go and JavaScript.
It is implemented using functional programming concepts and will be used to provide code examples for various functional programming aspects discussed later.
Generally speaking the parser is built using parser combinators, which are a good example to be implemented with functional programming.
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

`A & B | !C` is a possible expression, that can be parsed by the parser.
Depending on the values of A, B and C, which can be true or false, the parser determines the result of the expression.
The expression is then parsed by building an abstract syntax tree (AST), consisting of `Or`, `And`, `Not` and `Value` nodes, mimicking the EBNF grammar.
The created AST allows it to determine the results of the expression, when A, B and C are replaced by either `TRUE` or `FALSE`.

## Functional programming concepts

Functional programming and the functional programming paradigm have various unique concepts.
To see how well JavaScript and Go are suited for functional programming, we will take a look on these concepts and their support in both languages.

### Type system

JavaScript is a dynamic and weakly typed programming language, that also features duck-typing.
Weakly typed means, types are implicitly cast depending on the used operation.
Furthermore, dynamic typing allows for types to change their type at runtime, when their assigned value changes [moz05].

In the context of functional programming, the dynamic and weakly typing of JavaScript simplifies writing highly reusable functions.
This is especially useful for higher-order functions and function composition, because there is no need to use `any` types or do frequent type casts.

```javascript
export const makeOr = pair =>
  pair.second instanceof Nothing ? pair.first : new Or(pair.first, pair.second);
```

Go on the other hand is a strict and strongly typed programming language.
This means types are explicitly assigned and cannot change after assignment, except when explicitly cast by the developer.

Furthermore, there are no generic types in Go, so we have to use an empty interface to simulate an `any` type.
This makes the code more verbose and less readable than JavaScript code, while providing no benefit to the developer.
Generally speaking, the Go type system is not tailored to functional programming and is more or less a hurdle to the developer, when used this way.

Additionally, using empty interfaces to simulate generic types has an impact on performance, especially when doing many type conversions.
This is no problem in the rather small parser example, but might become one at a larger scale and should therefore be mentioned [she17].

However, by using empty interfaces, it's possible to write flexible and reusable functions in Go.

```go
func makeOr(argument interface{}) interface{} {
  var pair = argument.(Pair)
  if pair.Second == (Nothing{}) {
    return pair.First
  }
  var firstNode = pair.First.(ast.Node)
  var secondNode = pair.Second.(ast.Node)
  return ast.Or{LHS: firstNode, RHS: secondNode}
}
```

### Immutability

Immutability is a desired property, especially in functional programming, because it reduces unintended side effects.

Unfortunately, true immutability can't be achieved in JavaScript.
Although it's possible to create constructs that are sort of immutable, there is no built-in immutability as in pure functional programming languages.

One way to achieve immutability in JavaScript is to use the `const` keyword, that allows to define constant variables, functions or objects.
But while primitive types as strings defined with the `const` keyword are truly constant, objects created with the `const` keyword are still mutable [moz07].
As we can see in the example below, the properties of the `result` object can still be reassigned, despite the `result` object being declared as `const`.
So, used on an object, the `const` keyword only prevents to assign a new value to the object.

```javascript
export const optional = parser => input => {
  const result = parser(input);

  if (result.result === null) {
    result.result = new Nothing();
    result.remainingInput = input;
  }

  return result;
};
```

Another way to achieve immutability is to _freeze_ an object after creation.
This makes the object truly immutable, but still has the caveat, that it doesn't effect nested objects.
Therefore, it's necessary to call _freeze_ recursively on an object that should be truly immutable [moz08].

However, this is prone to developer mistakes and may not play nicely with libraries expecting mutable objects.

In Go immutability is quite similar to JavaScript and can't be easily achieved.
Except strings, data types in Go are mutable by default and only primitive data types like `bool` and `int` can declared to be constant.
The immutability of composite data types like Go's `structs` on the other hand, is in the responsibility of the developer.

As we can see in the example below, there is no way to declare the `result` struct as constant.

```go
func (parser Parser) Optional() Parser {
  return func(Input Input) Result {
    var result = parser(Input)
    if result.Result == nil {
      result.Result = Nothing{}
      result.RemainingInput = Input
    }
    return result
  }
}
```

For Go 2.0 however, there is a proposal to introduce new immutable data types to Go.
So this might change in the future, when Go 2.0 is released [git01].

To sum it up, as of today there is some support for immutability in JavaScript and in Go, but not by default and not easily usable.

### First class functions

First class functions are the foundation of supporting functional programming in a programming language.
A language with first class functions has to meet the following criteria:

- Allow passing functions as parameters to other functions.
- Allow functions to be return values of other functions, so that functions can return functions.
- Allow functions to be assigned to variables.
- Allow functions to be stored in data structures like arrays.

The listed properties also allow for concepts such as higher-order functions and functional composition, which both are described later.

In JavaScript, all the mentioned properties are supported.
Therefore, functions in JavaScript are first class functions and are treated like first-class citizens [moz06][fog13].
This allows us to assign the `optional()` and the `expectSeveral()` function to the `expectSpaces` variable in the example below.

```javascript
const expectSpaces = optional(expectSeveral(isSpaceChar, isSpaceChar));
```

The same holds true for Go, that has same support for first class functions than JavaScript [she17][gol01].
Like in JavaScript it's possible to assign the `ExpectSeveral()` and the `Optional()` function to the `ExpectSpaces` variable.
The only difference is the chaining of the function calls instead of nesting them and the explicit `Parser` type of the variable.

```go
var ExpectSpaces Parser = ExpectSeveral(isSpaceChar, isSpaceChar).Optional()
```

### Closures and lambda expressions

Closures or lambda expressions, also called anonymous functions, are unnamed functions, often returned from another function.
To be precise, a closure is the reference to the local state of the function, that returns an anonymous function.
However, both terms are often used interchangeably, because both concepts belong to the concept of anonymous functions, returned by an outer function [fog13].

Support for closures is found in all programming languages with first class functions.
This is the case, because closures are needed for anonymous functions to work.
Without closures and therefore no references to the _outer_ function, that is returning the _inner_ function, the _inner_ function would stop working when being called directly [moz02][fog13].

```javascript
export const convert = (parser, converter) => input => {
  const result = parser(input);

  if (result.result !== null) {
    result.result = converter(result.result);
  }

  return result;
};
```

In JavaScript lambda expressions can be written very concisely with the arrow functions syntax, introduced with ECMAScript 6 [moz04].

```go
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

In Go lambda expressions are a bit more verbose, especially because the type system requires explicit types as mentioned in the type system section earlier.
Apart from that, lambda expressions in Go are equal to lambda expressions in JavaScript [she17].

### Higher-order functions and function composition

Higher-order functions are functions that accept other functions as arguments or return a function as their result.
As discussed in the first class functions section, JavaScript has first class functions and therefore allows writing and using higher-order functions.

The convert function of the Boolean parser for example takes two arguments.
A parser function to be executed and a converter function to convert the result of the parser function.
This higher order function can be used for any desired parser function and with an arbitrary converter function.
The result is a highly flexible and easily reusable function.

```javascript
export const orElse = (parser, alternativeParser) => input => {
  const firstResult = parser(input);

  return firstResult.result !== null ? firstResult : alternativeParser(input);
};
```

In Go, the converter function looks similar to the JavaScript implementation.
This is the case, because Go has similar support for higher-order functions as JavaScript.
The main differences between the Go and the JavaScript implementation are the empty interfaces to satisfy the Go type system and the higher verbosity of the Go code.
Again the reason for this is the different type system of JavaScript and Go as discussed earlier [med02][she17].

```go
func (parser Parser) OrElse(alternativeParser Parser) Parser {
  return func(Input Input) Result {
    var FirstResult = parser(Input)
    if FirstResult.Result != nil {
      return FirstResult
    }
    return alternativeParser(Input)
  }
}
```

Function composition is a concept that allows to build complex functions out of one or more simple functions.
Generally speaking, function composition is an application of higher-order functions.

<!-- Currying -->

Function composition works good in JavaScript, especially because of the permissive type system, discussed earlier.
It's easy and straight forward to use various functions to build complex functions.
This can be seen in the `converter` function example above.

In Go, function composition requires the programmer to use empty interfaces.
This is required by Go type system as discussed earlier.

### Pure functions

Pure functions are functions that have no side effects and no hidden inner state.
This means, a function, given the same input, always produces the same output.
To achieve this a pure function only uses its input and doesn't use or mutate internal state.
This property of pure functions gives us referential transparency.
That means it's possible to replace a function with its result without changing the behaviour of a program.

JavaScript allows writing pure functions, but doesn't have special constructs to enforce side effect free and therefore pure functions [fog13].

The same holds true for Go.
Like in JavaScript, it's possible to write pure and side effect free functions in Go, but there are no special constructs to enforce these concepts.
Furthermore, because Go doesn't support tail-call optimization, which is discussed later, there is a performance impact on heavy use of pure functions and recursion.
So as long as there is no tail-call optimization in Go, pure functions should be used with precautions [she17].

Therefore, pure functions are possible in both languages, but it's in the responsibility of the programmer to keep them pure.

### Lazy evaluation

There are two ways to evaluate functions, eager and lazy evaluation.
Programming languages that use eager evaluation, evaluate a function as soon as it's assigned or defined.
Lazy evaluation, on the other hand, means that functions are evaluated when they are executed, which may happen much later than the assignment.

In the context of functional programming, lazy evaluation is useful for performance optimization.
This is possible, because functions are only evaluated, when they are actually used and therefore no unnecessary calculations are done.

Unfortunately both, Go and JavaScript, use eager evaluation for functions with no built-in support for lazy evaluation.
However, it's possible to simulate lazy evaluation in both languages, but it's no core part of the two programming languages.

### Recursion and tail-call optimization

To avoid mutating state functional programming makes heavy use of recursion.
Recursion happens when a function calls itself with new parameters to compute something instead of mutating state inside the function.
Unfortunately recursion is less efficient than iteration.

A technique to remedy the performance issues of recursion is called tail-call optimization.
Without tail-call optimization each recursive call to a function, adds a new stack frame to the call stack.
Therefore, the call stack grows with each function call and causes high memory usage on deeply nested recursion functions.
Tail-call optimization prevents this by overwriting the unneeded stack frames of the previous function calls.
So tail-call optimization is needed for efficient functional programming.

Tail-call optimization is a part of JavaScript since ECMAScript 6, which was introduced in 2015.

Go on the other side has no support for tail-call optimization.
<!-- Wont be introduced because of better error stacks -->
This means that heavy using of recursion and functional programming in Go will have an impact on performance.
There are some workarounds for this issue, but they are out of the scope of this paper.[med02][she17]

Summarized, JavaScript has better support for efficient recursion heavy programming than Go.

### Algebraic data types

Algebraic data types, also named sum/product types or discriminate unions, are a concept in functional programming languages to represent data structures by composing them with other types.

An example for this is the AST of our parser example.
The AST is a data structure consisting of nodes with the `OR`, `AND`, `NOT` or `VALUE` type.

With support of algebraic data structure we could write the AST much more concisely as we can see in following example.

```typescript
type Or = { lhs: Node, rhs: Node };
type And = { lhs: Node, rhs: Node };
type Not = { ex: Node };
type Value = { name: string };

type Node = Or | And | Not | Value;
```

Unfortunately this is not possible in JavaScript because it lacks types.
However, by using TypeScript, a JavaScript superset, it would be possible to use this syntax today.

In Go this feature isn't present either, but there is an ongoing discussion to introduce sum types along with generic types in Go 2.0 [git03].
This means, in the future, Go might get support for union types, allowing to easily represent AST nodes.

### Pattern matching

Pattern matching is a concept found in functional programming languages like Haskell to work with data structures [has01].
It's often used in conjunction with algebraic data types to select different behaviour depending on the data type.

In our parser example this would be useful for the evaluate function that could be written in a more functional matter instead of using JavaScript classes.
There is a stage 1 proposal to introduce pattern matching to JavaScript in the future [git02].
This means, in the future, the evaluate function could be written concisely as in the example below.

```javascript
const evaluate = (vars, node) => case (node) {
  when (node instanceof Or) -> evaluate(vars, node.lhs) || evaluate(vars, node.rhs)
  when (node instanceof And) -> evaluate(vars, node.lhs) && evaluate(vars, node.rhs)
  when (node instanceof Not) -> !evaluate(vars, node.ex)
  when (node instanceof Value) -> vars.get(node.name)
}
```

In Go on the other hand there is no support for pattern matching and there are no plans to introduce it to the language.

## Summary

After implementing the Boolean parser, it can be said that JavaScript is well suited to implement a parser.
As we have seen, JavaScript has good support for all the basic concepts of functional programming.
It's only missing some advanced concepts like pattern matching or algebraic data types, which would have simplified the parser implementation.

The only real downside is the dynamic and weakly typed type system of JavaScript.
While this allows for easily writing reusable functions, it also makes it hard to spot errors.
This was especially the case on some parser functions taking a lot of different inputs, like the convert function.
However, this disadvantage is more of general problem in JavaScript than a specific problem in functional programming.

When it comes to implementing the parser, the differences between Go and JavaScript are subtle.
The only real difference is the higher verbosity of the Go code, due to type annotations and type casts.

In the big picture, when compared to Go, JavaScript shows more focus on functional programming, especially on topics like tail-call optimization or short lambda expressions.
To sum it up, the support of functional programming in JavaScript is more advanced than it is in Go.

## References

- [ant16] JavaScript: Functional Programming for JavaScript Developers, Ved Antani; Simon Timms; Dan Mantyla, Packt Publishing, 2016-08-31
- [fog13] Functional JavaScript, Michael Fogus, O'Reilly Media, Inc., 2013-06-10
- [git01] [proposal: Go 2: immutable type qualifier](https://github.com/golang/go/issues/27975) (viewed 2019-12-26)
- [git02] [ECMAScript Pattern Matching](https://github.com/tc39/proposal-pattern-matching) (viewed 2019-12-27)
- [git03] [proposal: spec: add sum types / discriminated unions #19412](https://github.com/golang/go/issues/19412) (viewed 2020-01-03)
- [gol01] [Codewalk: First-Class Functions in Go](https://golang.org/doc/codewalk/functions/) (viewed 2019-12-26)
- [has01] [Case Expressions and Pattern Matching](https://www.haskell.org/tutorial/patterns.html) (viewed 2020-01-03)
- [ker17] Mastering Javascript Functional Programming, Federico Kereki, Packt Publishing, 2017-12-29
- [med01] [Introduction to Functional JavaScript](https://medium.com/functional-javascript/introduction-to-functional-javascript-45a9dca6c64a) (viewed 2019-12-21)
- [med02] [Functional Go](https://medium.com/@geisonfgfg/functional-go-bc116f4c96a4) (viewed 2019-12-26)
- [med03] [JS ES6 Recursive Tail Call Optimization](https://medium.com/@mlaythe/js-es6-recursive-tail-call-optimization-feaf2dada3f6) (viewed 2019-12-31)
- [moz01] [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (viewed 2019-12-25)
- [moz02] [MDN Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) (viewed 2019-12-23)
- [moz03] [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) (viewed 2019-12-25)
- [moz04] [MDN Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) (viewed 2019-12-25)
- [moz05] [MDN JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) (viewed 2019-12-25)
- [moz06] [MDN First-class Function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function) (viewed 2019-12-25)
- [moz07] [MDN const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) (viewed 2019-12-26)
- [moz08] [MDN Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) (viewed 2019-12-26)
- [she17] Learning Functional Programming in Go, Lex Sheehan, Packt Publishing, 2017-11-24
