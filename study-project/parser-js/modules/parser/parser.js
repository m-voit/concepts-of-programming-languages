/**
 * Expect exactly one rune in the Input. If the Input
 * starts with this rune it will become the result.
 *
 * @param {any} expectedCodePoint
 * @returns Result.
 */
function expectCodePoint(expectedCodePoint) {
  return expectedCodePoint;
}

/**
 * ExpectCodePoints expects exactly the code points from the slice
 * expectedCodePoints at the beginning of the Input in the given order.
 * If the Input begins with these code points then expectedCodePoints will
 * be the result of the parse.
 *
 * @param {any[]} expectedCodePoints
 * @returns Result.
 */
function expectCodePoints(expectedCodePoints) {
  return expectedCodePoints;
}

/**
 * Expect exactly one rune in the Input that does not
 * appear in the forbiddenCodePoints.
 *
 * @param {any[]} forbiddenCodePoints
 * @returns Result.
 */
function expectNotCodePoint(forbiddenCodePoints) {
  return forbiddenCodePoints;
}

/**
 * Fail is just a failing parser. No tricks.
 *
 * @param {any} input
 * @returns Result.
 */
function fail(input) {
  return input;
}

/**
 * ExpectString expects the Input to begin with the code points from the
 * expectedString in the given order. If the Input starts with these code
 * points then expectedString will be the result of the parse.
 *
 * @param {string} expectedString
 * @returns Result.
 */
function expectString(expectedString) {
  return expectedString;
}

/**
 * Repeated applies a parser zero or more times and accumulates the results
 * of the parses in a list. This parse always produces a non-nil result.
 *
 * @returns Result.
 */
function repeated() {}

/**
 * OnceOrMore is like Repeated except that it doesn't allow parsing zero times.
 *
 * @returns Result.
 */
function onceOrMore() {}

/**
 * RepeatAndFoldLeft is like Repeat except that it doesn't produce a list.
 * You can make RepeatAndFoldLeft implement Repeat by using the empty list as
 * the accumulator and PushBack as the combine function. The accumulator is
 * the initial value and every result of the parser will be added to the
 * accumulator using the combine function. See the calculator example for
 * an idiomatic use-case.
 *
 * @param {any} accumulator
 * @returns Result.
 */
function repeatAndFoldLeft(accumulator) {
  return accumulator;
}

/**
 * Bind uses the result of a first parser to construct a second parser that
 * will parse the left-over Input from the first parser. You can use this
 * to implement syntax annotations.
 *
 * @param {any} constructor
 * @returns Result.
 */
function bind(constructor) {
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
 * Export functions.
 */
export {
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
