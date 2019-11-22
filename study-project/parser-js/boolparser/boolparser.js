/**
 * Parse the following grammar: Expression := Or Spaces*
 * The syntax tree is exactly the one returned by Or.
 *
 * @param {any} input
 * @returns Result.
 */
function parseExpression(input) {
  //
}

/**
 * Parse the following grammar: Or := And ^ ("|" ^ Or)?
 * If the parser for ("|" ^ Or)? produces nothing then parseOr will return the
 * tree returned by And. Otherwise parseOr will return a new Or Node containing
 * the sub-trees returned by the recursive calls. parseOr uses expect to parse
 * the symbol "|", i. e. it actually allows for Space* ^ "|".
 *
 * @param {any} input
 * @returns Result.
 */
function parseOr(input) {
  //
}

/**
 * Parse the following grammar: And := Not ^ ("&" ^ And)?
 * If the parser for ("&" ^ And)? produces nothing then parseAnd will return the
 * tree returned by Not. Otherwise parseAnd will return a new And Node containing
 * the sub-trees returned by the recursive calls. parseAnd uses expect to parse
 * the symbol "&", i. e. it actually allows for Space* ^ "&".
 *
 * @param {any} input
 * @returns Result.
 */
function parseAnd(input) {
  //
}

/**
 * Parse the following grammar: Not := "!"* ^ Atom
 * It delegates parsing "!"* to parseExclamationMarks and the construction of Not
 * nodes to makeNots. If there's no exclamation mark then parseNot will return
 * the tree parsed by parseAtom. Otherwise parseNot will wrap the atom in as many
 * Not nodes as there are exclamation marks.
 *
 * @param {any} input
 * @returns Result.
 */
function parseNot(input) {
  //
}

/**
 * Parse the following grammar: "!"*
 * It returns the number of exclamation marks in Result. Result as an int.
 * parseExclamationMarks uses expect to parse the symbol "!", i. e. it actually
 * allows for Space* ^ "!".
 *
 * @param {any} input
 * @returns Result.
 */
function parseExclamationMarks(input) {
  //
}

/**
 * Parse the followiong grammar: Atom := Variable | "(" ^ Expression ^ ")"
 * The parenthesis won't appear in the abstract syntax tree. parseAtom uses
 * Parser.First() and Parser.Second() to extract the tree returned by
 * parseExpression.
 *
 * @param {any} input
 * @returns Result.
 */
function parseAtom(input) {
  //
}

/**
 * Parse the following grammar: Variable := [a-zA-Z_][a-zA-Z_0-9]*
 * It delegates parsing the variable name to ExpectIdentifier from the parser
 * combinators package and uses the Convert method on parsers to create the
 * ast.Val node.
 *
 * @param {any} input
 * @returns Result.
 */
function parseVariable(input) {
  //
}

/**
 * Wrap the node into num ast.Not nodes.
 *
 * @param {number} num
 * @param {any} node
 * @returns Node.
 */
function makeNot(num, node) {
  //
}

/**
 * Take a Pair of ast.Node as an argument and return an
 * ast.Node. If the second component of the pair is equal to Nothing{} then it
 * returns the first component of the Pair. If the second component is a Node
 * then makeAnd will create an ast.And node containing the first and the second
 * component of the Pair as sub-nodes.
 *
 * @param {any} argument
 * @returns Result.
 */
function makeAnd(argument) {
  //
}

/**
 * Take a Pair of ast.Node as an argument and return an
 * ast.Node. If the second component of the pair is equal to Nothing{} then it
 * returns the first component of the Pair. If the second component is a Node
 * then makeOr will create an ast.Or node containing the first and the second
 * component of the Pair as sub-nodes.
 *
 * @param {any} argument
 * @returns Result.
 */
function makeOr(argument) {
  //
}

/**
 * Expect the parameter string at the beginning of the Input and ignore
 * leading spaces.
 *
 * @param {string} string
 */
function expect(string) {
  //
}

/**
 * Export functions.
 */
export {
  parseExpression,
  parseOr,
  parseAnd,
  parseNot,
  parseExclamationMarks,
  parseAtom,
  parseVariable,
  makeNot,
  makeAnd,
  makeOr,
  expect
};
