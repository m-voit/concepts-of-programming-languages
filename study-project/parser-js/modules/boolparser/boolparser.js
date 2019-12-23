import { Or, And, Not, Value } from "../ast/ast";
import {
  Pair,
  Nothing,
  first,
  second,
  andThen,
  optional,
  expectIdentifier,
  expectSpaces,
  expectString,
  convert,
  repeated,
  maybeSpacesBefore,
  orElse,
} from "../parser/parser";

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
 * Parse the following grammar: Expression := Or Spaces*
 * The syntax tree is exactly the one returned by Or.
 *
 * @returns Result.
 */
const parseExpression = input =>
  first(andThen(parseOr, optional(expectSpaces)))(input);

/**
 * Parse the following grammar: Or := And ^ ("|" ^ Or)?
 * If the parser for ("|" ^ Or)? produces nothing then parseOr will return the
 * tree returned by And. Otherwise parseOr will return a new Or Node containing
 * the sub-trees returned by the recursive calls. parseOr uses expect to parse
 * the symbol "|", i. e. it actually allows for Space* ^ "|".
 *
 * @returns Result.
 */
const parseOr = input =>
  convert(
    andThen(parseAnd, optional(second(andThen(expect("|"), parseOr)))),
    makeOr,
  )(input);

/**
 * Parse the following grammar: And := Not ^ ("&" ^ And)?
 * If the parser for ("&" ^ And)? produces nothing then parseAnd will return the
 * tree returned by Not. Otherwise parseAnd will return a new And Node containing
 * the sub-trees returned by the recursive calls. parseAnd uses expect to parse
 * the symbol "&", i. e. it actually allows for Space* ^ "&".
 *
 * @returns Result.
 */
const parseAnd = input =>
  convert(
    andThen(parseNot, optional(second(andThen(expect("&"), parseAnd)))),
    makeAnd,
  )(input);

/**
 * Parse the following grammar: Not := "!"* ^ Atom
 * It delegates parsing "!"* to parseExclamationMarks and the construction of Not
 * nodes to makeNots. If there's no exclamation mark then parseNot will return
 * the tree parsed by parseAtom. Otherwise parseNot will wrap the atom in as many
 * Not nodes as there are exclamation marks.
 *
 * @returns Result.
 */
const parseNot = input =>
  convert(andThen(parseExclamationMarks, parseAtom), (first, second) => {
    return makeNot(first, second);
  })(input);

/**
 * Parse the following grammar: "!"*
 * It returns the number of exclamation marks in Result. Result as an int.
 * parseExclamationMarks uses expect to parse the symbol "!", i. e. it actually
 * allows for Space* ^ "!".
 *
 * @returns Result.
 */
const parseExclamationMarks = input =>
  convert(repeated(expect("!")), arg => arg.length)(input);

/**
 * Parse the followiong grammar: Atom := Variable | "(" ^ Expression ^ ")"
 * The parenthesis won't appear in the abstract syntax tree. parseAtom uses
 * Parser.First() and Parser.Second() to extract the tree returned by
 * parseExpression.
 *
 * @returns Result.
 */
const parseAtom = input =>
  orElse(
    parseVariable,
    second(first(andThen(andThen(expect("("), parseExpression), expect(")")))),
  )(input);

/**
 * Parse the following grammar: Variable := [a-zA-Z_][a-zA-Z_0-9]*
 * It delegates parsing the variable name to ExpectIdentifier from the parser
 * combinators package and uses the Convert method on parsers to create the
 * ast.Val node.
 *
 * @returns Result.
 */
const parseVariable = input =>
  convert(maybeSpacesBefore(expectIdentifier), () => {
    return new Value(input.text);
  })(input);

/**
 * Wrap the node into Not nodes.
 *
 * @param {number} number
 * @param {any} node
 * @returns Node.
 */
const makeNot = (number, node) => {
  return number <= 0 ? node : new Not(makeNot(number - 1, node));
};

/**
 * Take a Pair of Nodes as an argument and return Node.
 * If the second component of the pair is equal to Nothing then return
 * the first component of the Pair. If the second component is a Node
 * then create an And node containing the first and the second
 * component of the Pair as sub-nodes.
 *
 * @param {any} first
 * @param {any} second
 * @returns Result.
 */
const makeAnd = (first, second) => {
  const pair = new Pair(first, second);

  return pair.second instanceof Nothing
    ? pair.first
    : new And(pair.first, pair.second);
};

/**
 * Take a Pair of Nodes as an argument and return a Node.
 * If the second component of the pair is equal to Nothing{} then return
 * the first component of the Pair. If the second component is a Node
 * then create an Or node containing the first and the second
 * component of the Pair as sub-nodes.
 *
 * @param {any} first
 * @param {any} second
 * @returns Result.
 */
const makeOr = (first, second) => {
  const pair = new Pair(first, second);

  return pair.second instanceof Nothing
    ? pair.first
    : new Or(pair.first, pair.second);
};

/**
 * Expect the parameter string at the beginning of the Input and ignore
 * leading spaces.
 *
 * @param {string} string
 */
const expect = string => maybeSpacesBefore(expectString(string));

/**
 * Export functions.
 */
export {
  makeNot,
  makeAnd,
  makeOr,
  parseExpression,
  parseExclamationMarks,
  parseVariable,
};
