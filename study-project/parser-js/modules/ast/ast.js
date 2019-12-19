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
 * @param lhs The AST node on the left hand side.
 * @param rhs The AST node on the right hand side.
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

/**
 * And is the logical AND Operator in an AST.
 *
 * @param lhs The AST node on the left hand side.
 * @param rhs The AST node on the right hand side.
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

/**
 * Value is a boolean variable in an AST.
 *
 * @param {string} name The name of the value.
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

/**
 * Export classes to be used in other modules.
 */
export { Or, And, Not, Value };
