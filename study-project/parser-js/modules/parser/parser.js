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
 * Input class is the input to be parsed.
 */
export class Input {
  /**
   * @param {string} text
   * @param {number} currentPosition
   */
  constructor(text, currentPosition) {
    this.text = text;
    this.currentPosition = currentPosition;
  }

  remainingInput() {
    return this.currentPosition + 1 >= this.text.length
      ? null
      : new Input(this.text, this.currentPosition + 1);
  }

  currentCodePoint() {
    return this.currentPosition >= this.text.length
      ? "\x00"
      : this.text.charAt(this.currentPosition);
  }
}

/**
 * Pair is a simple pair. Please use it only as an intermediate data structure.
 * If you know what you're parsing then convert your pairs into structs with
 * more meaningful names.
 */
export class Pair {
  /**
   * @param {any} first The first component of the pair.
   * @param {any} second The second component of the pair.
   */
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }
}

/**
 * Nothing class is simply nothing.
 */
export class Nothing {}

/**
 * Result is the result of a parse along with the Input that remains to
 * be parsed.
 */
export class Result {
  /**
   * @param {string | any | Pair} result
   * @param {Input} remainingInput
   */
  constructor(result, remainingInput) {
    this.result = result;
    this.remainingInput = remainingInput;
  }
}

/**
 * Expect exactly one character in the Input. If the Input
 * starts with this character it will become the result.
 *
 * @param {string} expectedCodePoint
 * @returns A new result.
 */
export const expectCodePoint = expectedCodePoint => input => {
  return expectedCodePoint === input.currentCodePoint()
    ? new Result(expectedCodePoint, input.remainingInput())
    : new Result(null, input);
};

/**
 * Expect exactly the code points from the array
 * expectedCodePoints at the beginning of the Input in the given order.
 * If the Input begins with these code points then expectedCodePoints will
 * be the result of the parse.
 *
 * @param {string} expectedCodePoints
 * @returns A new Result.
 */
export const expectCodePoints = expectedCodePoints => input => {
  let remainingInput = input;

  for (let expectedCodePoint of expectedCodePoints) {
    if (remainingInput === null) {
      return new Result(null, input);
    }

    const result = expectCodePoint(expectedCodePoint)(remainingInput);

    if (result.result === null) {
      return new Result(null, remainingInput);
    }

    remainingInput = result.remainingInput;
  }

  return new Result(expectedCodePoints, remainingInput);
};

/**
 * Expect the Input to begin with the code points from the
 * expectedString in the given order. If the Input starts with these code
 * points then expectedString will be the result of the parse.
 *
 * @param {string} expectedString
 * @returns A new Result.
 */
export const expectString = expectedString => input =>
  expectCodePoints(expectedString)(input);

/**
 * Apply the parser zero or more times and accumulate the results
 * of the parses in a list. This parse always produces a non-null result.
 *
 * @param {any} parser The parser.
 * @returns A new Result.
 */
export const repeated = parser => input => {
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
 * Use the first parser to parse the Input. If this fails use the second
 * parser to parse the same Input. Only use non-overlapping
 * parsers with this combinator! For the most part it's the usual alternative
 * except that it's first-come, first-served: if the first parser succeeds,
 * then it will not attempt to use the second parser and there's no
 * back-tracking. This is in contrast to most regex-libs where the longest
 * match wins. The first match wins here, please keep this in mind.
 *
 * @param {any} parser The parser.
 * @param {any} alternativeParser An alternative parser to be used when first parser fails.
 * @returns Result.
 */
export const orElse = (parser, alternativeParser) => input => {
  const firstResult = parser(input);

  return firstResult.result !== null ? firstResult : alternativeParser(input);
};

/**
 * Extract the first component of a pair or
 * return the argument if it is not a pair.
 *
 * @param {Pair | any} pair A pair.
 * @returns An new Result.
 */
export const getFirst = pair => (pair instanceof Pair ? pair.first : pair);

/**
 * Extract the second component of a pair or
 * return the argument if it is not a pair.
 *
 * @param {Pair | any} pair A pair.
 * @returns An new Result.
 */
export const getSecond = pair => (pair instanceof Pair ? pair.second : pair);

/**
 * Extract the first component of the result of a successful parse.
 * If the parser fails then do nothing.
 *
 * @param {any} parser The parser
 * @returns A new Result.
 */
export const first = parser => convert(parser, getFirst);

/**
 * Extract the second component of the result of a successful parse.
 * If the parser fails then do nothing.
 *
 * @param {any} parser The parser.
 * @returns A new Result.
 */
export const second = parser => convert(parser, getSecond);

/**
 * Apply the firstParser to the Input and then the
 * secondParser. The result will be a Pair containing the results
 * of both parsers.
 *
 * @param {any} parser The parser to apply first.
 * @param {any} secondParser The parser to apply second.
 * @returns A new Result.
 */
export const andThen = (parser, secondParser) => input => {
  const firstResult = parser(input);

  if (firstResult.result !== null) {
    const secondResult = secondParser(firstResult.remainingInput);

    if (secondResult !== null) {
      return new Result(
        new Pair(firstResult.result, secondResult.result),
        secondResult.remainingInput,
      );
    }

    return secondResult;
  }

  return firstResult;
};

/**
 * Apply the converter to the result of a successful parse.
 * If the parser fails then do nothing.
 *
 * @param {any} parser The parser.
 * @param {any} converter A function to be applied to the parser result.
 * @returns A new Result.
 */
export const convert = (parser, converter) => input => {
  const result = parser(input);

  if (result.result !== null) {
    result.result = converter(result.result);
  }

  return result;
};

/**
 * Apply the parser zero or one times to the Input.
 * If the parser itself would fail then the Optional parser can still
 * produce a successful parse with the result Nothing.
 *
 * @param {any} parser The parser.
 * @returns A new Result.
 */
export const optional = parser => input => {
  const result = parser(input);

  if (result.result === null) {
    result.result = new Nothing();
    result.remainingInput = input;
  }

  return result;
};

/**
 * Convert a string to an input class instance.
 *
 * @param {string} text
 * @returns A new input class instance.
 */
export const stringToInput = text => new Input(text, 0);

/**
 * Check if firstCodePoint is the identifierStartChar.
 *
 * @param {string} firstCodePoint
 * @returns True or false.
 */
export const isIdentifierStartChar = firstCodePoint =>
  ("a" <= firstCodePoint && firstCodePoint <= "z") ||
  ("A" <= firstCodePoint && firstCodePoint <= "Z") ||
  "_" == firstCodePoint;

/**
 * Check if codepoint is a digit.
 *
 * @param {string} codePoint
 * @returns True or false.
 */
export const isDigit = codePoint => "0" <= codePoint && codePoint <= "9";

/**
 * Check if codepoint is either an identifierStartChar or a digit.
 *
 * @param {string} codePoint
 * @returns True when it's either an identifierStartChar or a digit,
 * otherwise return false.
 */
export const isIdentifierChar = codePoint =>
  isIdentifierStartChar(codePoint) || isDigit(codePoint);

/**
 * Check if codepoint is a space char.
 *
 * @param {string} codePoint
 * @returns True or false.
 */
export const isSpaceChar = codePoint =>
  codePoint == " " ||
  codePoint == "\n" ||
  codePoint == "\r" ||
  codePoint == "\t";

/**
 * Accept the first code point from the Input if isFirstChar
 * returns true. After reading the first character, take all following code
 * points as long as they satisfy isLaterChar. Stop parsing the Input at the
 * first code point that doesn't satisfy isLaterChar. Only fail if the first
 * character from the Input doesn't satisfy isFirstChar!
 *
 * @param {any} isFirstChar A function.
 * @param {any} isLaterChar A function.
 */
export const expectSeveral = (isFirstChar, isLaterChar) => input => {
  if (null === input) {
    return new Result(null, input);
  }

  const firstCodePoint = input.currentCodePoint();

  if (!isFirstChar(firstCodePoint)) {
    return new Result(null, input);
  }

  let builder = "";
  let codePoint = firstCodePoint;
  let remainingInput = input;

  while (isLaterChar(codePoint)) {
    remainingInput = remainingInput.remainingInput();
    builder = builder + codePoint;

    if (remainingInput === null) {
      break;
    } else {
      codePoint = remainingInput.currentCodePoint();
    }
  }

  return new Result(builder, remainingInput);
};

/**
 * Parse [a-zA-Z_][a-zA-Z0-9_]* from the Input.
 */
export const expectIdentifier = expectSeveral(
  isIdentifierStartChar,
  isIdentifierChar,
);

/**
 * Parse [ \t\n\r]* from the Input.
 */
export const expectSpaces = optional(expectSeveral(isSpaceChar, isSpaceChar));

/**
 * Allow and ignore space characters before applying the
 * parser from the argument.
 *
 * @param {any} parser The parser.
 */
export const maybeSpacesBefore = parser =>
  second(andThen(expectSpaces, parser));
