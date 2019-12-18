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
 * Or is the logical OR Operator in an AST.
 *
 * @param lhs An AST node.
 * @param rhs An AST node.
 */
class Or {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  /**
   * Evaluate the AST.
   *
   * @param {Map<string, boolean>} vars
   * @returns True or false.
   */
  evaluate(vars) {
    return this.lhs.evaluate(vars) || this.rhs.evaluate(vars);
  }
}

// /**
//  * @param {Map<string, boolean>} vars
//  * @param {Or} or
//  * @returns Boolean
//  */
// function evaluateOr(vars, or) {
//   return or.evaluateLhs(vars) || or.evaluateRhs(vars);
// }

/**
 * And is the logical AND Operator in an AST.
 *
 * @param lhs An AST node.
 * @param rhs An AST node.
 */
class And {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  /**
   * Evaluate the AST.
   *
   * @param {Map<string, boolean>} vars
   * @returns True or false.
   */
  evaluate(vars) {
    return this.lhs.evaluate(vars) && this.rhs.evaluate(vars);
  }
}

// /**
//  * @param {Map<string, boolean>} vars
//  * @param {And} and
//  * @returns Boolean
//  */
// function evaluateAnd(vars, and) {
//   return and.lhs.evaluateAnd(vars) && and.rhs.evaluateAnd(vars);
// }

/**
 * Not is the NOT operator in the AST.
 *
 * @param ex An AST node.
 */
class Not {
  constructor(ex) {
    this.ex = ex;
  }

  /**
   * Evaluate the AST.
   *
   * @param {Map<string, boolean>} vars
   * @returns True or false.
   */
  evaluate(vars) {
    return !this.ex.evaluate(vars);
  }
}

// /**
//  * @param {Map<string, boolean>} vars
//  * @param {Not} not
//  * @returns Boolean
//  */
// function evaluateNot(vars, not) {
//   return !not.evaluateNot(vars, not);
// }

/**
 * Value is a boolean variable in an AST.
 *
 * @param {string} name
 */
class Value {
  constructor(name) {
    this.name = name;
  }

  /**
   * Evaluate the AST.
   *
   * @param {Map<string, boolean>} vars
   * @returns True or false.
   */
  evaluate(vars) {
    return vars.get(this.name);
  }
}

// /**
//  * @param {Map<string, boolean>} vars
//  * @param {Value} value
//  * @returns Boolean
//  */
// function evaluateValue(vars, value) {
//   return vars[value.name];
// }

export { Or, And, Not, Value };
