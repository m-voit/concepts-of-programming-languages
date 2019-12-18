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
 * Ast node.
 */
function AstNode() {
  this.evaluate = function evaluate(vars) {};
}

/**
 * Or is the logical OR Operator in an AST.
 *
 * @param lhs
 * @param rhs
 */
function Or(lhs, rhs) {
  this.lhs = lhs;
  this.rhs = rhs;

  this.lhs.evaluateOr() = evaluateOr(vars, this);
  this.rhs.evaluateOr() = evaluateOr(vars, this);
}

/**
 * @param {Map<string, boolean>} vars
 * @param {Or} or
 * @returns Boolean
 */
function evaluateOr(vars, or) {
  return or.lhs.evaluateOr(vars) || or.rhs.evaluateOr(vars);
}

/**
 * And is the logical AND Operator in an AST.
 *
 * @param lhs
 * @param rhs
 */
function And(lhs, rhs) {
  this.lhs = lhs;
  this.rhs = rhs;

  this.lhs.evaluateAnd() = evaluateAnd(vars, this);
  this.rhs.evaluateAnd() = evaluateAnd(vars, this);
}

/**
 * @param {Map<string, boolean>} vars
 * @param {And} and
 * @returns Boolean
 */
function evaluateAnd(vars, and) {
  return and.lhs.evaluateAnd(vars) && and.rhs.evaluateAnd(vars);
}

/**
 * Not is the NOT operator in the AST
 */
function Not() {
  this.lhs.evaluateNot() = evaluateAnd(vars, this);
}

/**
 * @param {Map<string, boolean>} vars
 * @param {Not} not
 * @returns Boolean
 */
function evaluateNot(vars, not) {
  return !not.evaluateNot(vars, not);
}

/**
 * Value is a boolean variable in an AST.
 *
 * @param {string} name
 */
function Value(name) {
  this.name = name;
}

/**
 * @param {Map<string, boolean>} vars
 * @param {Value} value
 * @returns Boolean
 */
function evaluateValue(vars, value) {
  return vars[value.name];
}
