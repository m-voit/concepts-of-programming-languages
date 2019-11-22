/**
 * Parse the following grammar: Expression := Or Spaces*
 * The syntax tree is exactly the one returned by Or.
 *
 * @param {any} input
 * @returns Result
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
 * @returns Result
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
 * @returns Result
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
 * @returns Result
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
 * @returns Result
 */
function parseExclamationMarks(input) {
  //
}
