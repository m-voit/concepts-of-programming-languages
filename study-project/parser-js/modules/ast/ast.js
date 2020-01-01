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
 */
export class Or {
  /**
   * @param {Or | Value | And} lhs The AST node on the left hand side.
   * @param {Or | Value | And} rhs The AST node on the right hand side.
   */
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
 */
export class And {
  /**
   * @param {And | Value | Not} lhs The AST node on the left hand side.
   * @param {And | Value | Not} rhs The AST node on the right hand side.
   */
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
 */
export class Not {
  /**
   * @param {Value | Not | Or} ex An AST node.
   */
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
 */
export class Value {
  /**
   * @param {string} name The name of the value.
   */
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
 * Or is the logical OR Operator in an AST.
 */
// const Or = (lhs, rhs) => vars => lhs(vars) || rhs(vars);

/**
 * And is the logical AND Operator in an AST.
 */
// const And = (lhs, rhs) => vars => lhs(vars) && rhs(vars);

/**
 * Not is the NOT operator in the AST.
 */
// const Not = ex => vars => ex(vars);

/**
 * Value is a boolean variable in an AST.
 */
// const Value = name => vars => vars.get(name);
