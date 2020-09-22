import { And, Not, Or, Value } from "../ast/ast";
import {
  andThen,
  convert,
  expectIdentifier,
  expectSpaces,
  expectString,
  first,
  // eslint-disable-next-line no-unused-vars
  Input,
  maybeSpacesBefore,
  Nothing,
  optional,
  orElse,
  // eslint-disable-next-line no-unused-vars
  Pair,
  repeated,
  second,
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
 * Parse the grammar: Expression := Or Spaces*
 * The syntax tree is exactly the one returned by OR.
 *
 * @param {Input} input The input to be parsed.
 * @returns An AST of the parsed expression.
 */
export const parseExpression = (input) =>
  first(andThen(parseOr, optional(expectSpaces)))(input);

/**
 * Parse the grammar: Or := And ^ ("|" ^ Or)?
 * If the parser for ("|" ^ Or)? produces nothing then return the
 * tree returned by And. Otherwise return a new OR Node containing
 * the sub-trees returned by the recursive calls. It uses expect to parse
 * the symbol "|", i.e. it actually allows for Space* ^ "|".
 *
 * @param {Input} input The input to be parsed.
 * @returns A tree of AST nodes.
 */
export const parseOr = (input) =>
  convert(
    andThen(parseAnd, optional(second(andThen(expect("|"), parseOr)))),
    makeOr,
  )(input);

/**
 * Parse the grammar: And := Not ^ ("&" ^ And)?
 * If the parser for ("&" ^ And)? produces nothing then return the
 * tree returned by Not. Otherwise return a new AND Node containing
 * the sub-trees returned by the recursive calls. It uses expect to parse
 * the symbol "&", i.e. it actually allows for Space* ^ "&".
 *
 * @param {Input} input The input to be parsed.
 * @returns A tree of AST nodes.
 */
export const parseAnd = (input) =>
  convert(
    andThen(parseNot, optional(second(andThen(expect("&"), parseAnd)))),
    makeAnd,
  )(input);

/**
 * Parse the grammar: Not := "!"* ^ Atom
 * It delegates parsing "!"* to parseExclamationMarks() and the
 * construction of Not nodes to makeNot(). If there's no exclamation
 * mark then return the tree parsed by parseAtom(). Otherwise wrap
 * the atom in as many NOT nodes as there are exclamation marks.
 *
 * @param {Input} input The input to be parsed.
 * @returns A tree of AST nodes.
 */
export const parseNot = (input) =>
  convert(andThen(parseExclamationMarks, parseAtom), (pair) => {
    return makeNot(pair.first, pair.second);
  })(input);

/**
 * Parse the grammar: "!"*
 * Return the number of exclamation marks in result as a number.
 * It uses expect to parse the symbol "!", i. e. it actually
 * allows for Space* ^ "!".
 *
 * @param {Input} input The input to be parsed.
 * @returns A new result.
 */
export const parseExclamationMarks = (input) =>
  convert(repeated(expect("!")), (arg) => arg.length)(input);

/**
 * Parse the grammar: Atom := Variable | "(" ^ Expression ^ ")"
 * The parenthesis won't appear in the abstract syntax tree. It uses
 * first() and second() to extract the tree returned by parseExpression().
 *
 * @param {Input} input The input to be parsed.
 * @returns A tree of AST nodes.
 */
export const parseAtom = (input) =>
  orElse(
    parseVariable,
    second(first(andThen(andThen(expect("("), parseExpression), expect(")")))),
  )(input);

/**
 * Parse the grammar: Variable := [a-zA-Z_][a-zA-Z_0-9]*
 * It delegates parsing the variable name to the expectIdentifier() function
 * and uses the convert() function to create the VALUE node.
 *
 * @param {Input} input The input to be parsed.
 * @returns A new VALUE node.
 */
export const parseVariable = (input) =>
  convert(maybeSpacesBefore(expectIdentifier), (arg) => new Value(arg))(input);

/**
 * Wrap nodes into NOT nodes.
 *
 * @param {number} number The number of NOT nodes to wrap the node in.
 * @param {any} node The AST node to be wrapped into NOT nodes.
 * @returns A new NOT node.
 */
export const makeNot = (number, node) =>
  number <= 0 ? node : new Not(makeNot(number - 1, node));

/**
 * Take a Pair of Nodes as an argument and return a Node.
 * If the second component of the pair is equal to Nothing then return
 * the first component of the Pair. If the second component is a Node
 * then create an AND node containing the first and the second
 * component of the Pair as sub-nodes.
 *
 * @param {Pair} pair A pair of Nodes.
 * @returns A new AND node.
 */
export const makeAnd = (pair) =>
  pair.second instanceof Nothing
    ? pair.first
    : new And(pair.first, pair.second);

/**
 * Take a Pair of Nodes as an argument and return a Node.
 * If the second component of the pair is an instanceof Nothing() then
 * return the first component of the Pair. If the second component is
 * a Node then create an OR node containing the first and the second
 * component of the Pair as sub-nodes.
 *
 * @param {Pair} pair A pair of Nodes.
 * @returns A new OR node.
 */
export const makeOr = (pair) =>
  pair.second instanceof Nothing ? pair.first : new Or(pair.first, pair.second);

/**
 * Expect the parameter string at the beginning of the Input and ignore
 * leading spaces.
 *
 * @param {string} string
 */
export const expect = (string) => maybeSpacesBefore(expectString(string));
