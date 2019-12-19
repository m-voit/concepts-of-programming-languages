// @ts-nocheck

/**
 * The expression should have the following EBNF form:
 * ---------------------------------------------------------
 * <expression> ::= <term> { <or> <term> }
 * <term> ::= <factor> { <and> <factor> }
 * <factor> ::= <var> | <not> <factor> | (<expression>)
 * <or>  ::= '|'
 * <and> ::= '&'
 * <not> ::= '!'
 * <var> ::= '[a-zA-Z0-9]*'
 * ---------------------------------------------------------
 */

/**
 *
 */
class Input {
  currentCodePoint() {
    //
  }
}

/**
 * Pair is a simple pair. Please use it only as an intermediate data structure.
 * If you know what you're parsing then convert your pairs into structs with
 * more meaningful names.
 *
 * @param {any} first The first component of the pair.
 * @param {any} second The second component of the pair.
 */
class Pair {
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }
}

/**
 *
 * @param {Input} input
 */
function Parser(input) {
  return new Result();
}

/**
 * Result is the result of a parse along with the Input that remains to
 * be parsed.
 *
 * @param {any} result
 * @param {Input} remainingInput
 */
class Result {
  constructor(result, remainingInput) {
    this.result = result;
    this.remainingInput = remainingInput;
  }
}

// function expectCodePoint(expectedCodePoint) {
//   return function(input) {
//     expectedCodePoint === input.currentCodePoint()
//       ? new Result(expectedCodePoint, input.remainingInput())
//       : new Result(null, input);
//   };
// }

/**
 * Expect exactly one character in the Input. If the Input
 * starts with this character it will become the result.
 *
 * @param {string} expectedCodePoint
 * @returns A new result.
 */
const expectCodePoint = expectedCodePoint => input => {
  expectedCodePoint === input.currentCodePoint()
    ? new Result(expectedCodePoint, input.remainingInput())
    : new Result(null, input);
};

/**
 * Fail is a failing parser.
 *
 * @param {Input} input
 * @returns Result.
 */
const fail = input => {
  return new Result(null, input);
};

// function expectNotCodePoint(forbiddenCodePoints) {
//   return function(input) {
//     forbiddenCodePoints.forEach(forbiddenCodePoint => {
//       if (input.currentCodePoint() === forbiddenCodePoint) {
//         return new Result(null, input);
//       }
//     });

//     return new Result(input.currentCodePoint, input.remainingInput);
//   };
// }

/**
 * Expect exactly one character in the Input that does not
 * appear in the forbiddenCodePoints.
 *
 * @param {string[]} forbiddenCodePoints
 * @returns Result.
 */
const expectNotCodePoint = forbiddenCodePoints => input => {
  forbiddenCodePoints.forEach(forbiddenCodePoint => {
    if (input.currentCodePoint() === forbiddenCodePoint) {
      return new Result(null, input);
    }
  });

  return new Result(input.currentCodePoint(), input.remainingInput());
};

// function expectCodePoints(expectedCodePoints) {
//   return function(input) {
//     let remainingInput = input;

//     for (expectedCodePoint in expectedCodePoints) {
//       if (null === remainingInput) {
//         return new Result(null, input);
//       }

//       const result = expectCodePoint(expectedCodePoint);

//       if (result.result === null) {
//         return new Result(null, remainingInput);
//       }

//       remainingInput = result.remainingInput;
//     }

//     return new Result(expectCodePoints, remainingInput);
//   };
// }

/**
 * ExpectCodePoints expects exactly the code points from the array
 * expectedCodePoints at the beginning of the Input in the given order.
 * If the Input begins with these code points then expectedCodePoints will
 * be the result of the parse.
 *
 * @param {string[]} expectedCodePoints
 * @returns Result.
 */
const expectCodePoints = expectedCodePoints => input => {
  let remainingInput = input;

  expectedCodePoints.forEach(expectedCodePoint => {
    if (null === remainingInput) {
      return new Result(null, input);
    }

    const result = expectCodePoint(expectedCodePoint);

    if (result.result === null) {
      return new Result(null, remainingInput);
    }

    remainingInput = result.remainingInput;
  });

  return new Result(expectCodePoints, remainingInput);
};

/**
 * Expect the Input to begin with the code points from the
 * expectedString in the given order. If the Input starts with these code
 * points then expectedString will be the result of the parse.
 *
 * @param {string} expectedString
 * @returns Result.
 */
const expectString = expectedString => {
  return expectCodePoints(expectedString);
};

/**
 * Repeated applies a parser zero or more times and accumulates the results
 * of the parses in a list. This parse always produces a non-nil result.
 *
 * @param {Parser} parser
 * @returns Result.
 */
const repeated = parser => input => {
  const result = new Result([], input);

  while (result.remainingInput !== null) {
    const oneMoreResult = parser(result.remainingInput);

    if (oneMoreResult.result === null) {
      return result;
    }

    result.result.push(oneMoreResult.result);
    result.remainingInput = oneMoreResult.remainingInput;
  }

  return result;
};

/**
 * OnceOrMore is like Repeated except that it doesn't allow parsing zero times.
 *
 * @param {Parser} parser
 * @returns Result.
 */
const onceOrMore = parser => input => {
  const result = repeated(parser);

  result.result > 0 ? result : new Result(null, input);
};

/**
 * RepeatAndFoldLeft is like Repeat except that it doesn't produce a list.
 * You can make RepeatAndFoldLeft implement Repeat by using the empty list as
 * the accumulator and PushBack as the combine function. The accumulator is
 * the initial value and every result of the parser will be added to the
 * accumulator using the combine function. See the calculator example for
 * an idiomatic use-case.
 *
 * @param {Parser} parser
 * @param {any} accumulator Function.
 * @param {any} combine Function with two args.
 * @returns Result.
 */
const repeatAndFoldLeft = (parser, accumulator, combine) => input => {
  const result = new Result(accumulator, input);

  while (result.remainingInput !== null) {}
};

/**
 * Bind uses the result of a first parser to construct a second parser that
 * will parse the left-over Input from the first parser. You can use this
 * to implement syntax annotations.
 *
 * @param {Parser} parser
 * @param {any} constructor
 * @returns Result.
 */
function bind(parser, constructor) {
  return constructor;
}

/**
 * OrElse uses the first parser to parse the Input. If this fails it will
 * use the second parser to parse the same Input. Only use non-overlapping
 * parsers with this combinator! For the most part it's the usual alternative
 * except that it's first-come, first-served: if the first parser succeeds,
 * then it will not attempt to use the second parser and there's no
 * back-tracking. This is in contrast to most regex-libs where the longest
 * match wins. The first match wins here, please keep this in mind.
 *
 * @param {any} alternativeParser
 * @returns Result.
 */
function orElse(alternativeParser) {
  return alternativeParser;
}

/**
 * GetFirst extracts the first component of a pair or
 * returns the argument if it is not a pair.
 *
 * @param {any} argument
 * @returns Result.
 */
function getFirst(argument) {
  return argument;
}

/**
 * GetSecond extracts the second component of a pair or
 * returns the argument if it is not a pair.
 *
 * @param {any} argument
 * @returns Result.
 */
function getSecond(argument) {
  return argument;
}

/**
 * AndThen applies the firstParser to the Input and then the
 * secondParser. The result will be a Pair containing the results
 * of both parsers.
 *
 * @param {any} secondParser
 * @returns Result.
 */
function andThen(secondParser) {
  return secondParser;
}

/**
 * Convert applies the converter to the result of a successful parse.
 * If the parser fails then Convert won't do anything.
 *
 * @param {any} converter
 * @returns Result.
 */
function convert(converter) {
  return converter;
}

/**
 * First extracts the first component of the result of a successful parse.
 * If the parser fails then First won't do anything.
 *
 * @returns Result.
 */
function first() {}

/**
 * Second extracts the second component of the result of a successful parse.
 * If the parser fails then Second won't do anything.
 *
 * @returns Result.
 */
function second() {}

/**
 * Optional applies the parser zero or one times to the Input.
 * If the parser itself would fail then the Optional parser can still
 * produce a successful parse with the result Nothing{}.
 *
 * @returns Result.
 */
function optional() {}

/**
 * Allow and ignore space characters before applying the
 * parser from the argument.
 *
 * @param {any} parser
 */
function maybeSpacesBefore(parser) {
  return parser;
}

/**
 * Export functions and classes to use in other modules.
 */
export {
  Pair,
  expectCodePoint,
  expectCodePoints,
  expectNotCodePoint,
  fail,
  expectString,
  repeated,
  onceOrMore,
  repeatAndFoldLeft,
  bind,
  orElse,
  getFirst,
  getSecond,
  andThen,
  convert,
  first,
  second,
  optional,
  maybeSpacesBefore,
};
