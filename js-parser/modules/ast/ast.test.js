// @ts-nocheck

import { Or, And, Not, Value } from "./ast.js";

test("ast", () => {
  // AST for expression: "A AND B OR !C"
  const ast = new Or(
    new And(new Value("A"), new Value("B")),
    new Not(new Value("C")),
  );

  /**
   * Table to test all combinations for A, B, C -> 2^3 = 8 combinations.
   * Format of Table: [ Value for A, Value for B, Value for C, Expected Result ]
   */
  const truthTable = [
    [false, false, false, true],
    [false, false, true, false],
    [false, true, true, false],
    [false, true, false, true],
    [true, false, false, true],
    [true, true, false, true],
    [true, false, true, false],
    [true, true, true, true],
  ];

  truthTable.forEach(entry => {
    const values = new Map();

    values.set("A", entry[0]);
    values.set("B", entry[1]);
    values.set("C", entry[2]);

    const expected = entry[3];
    const result = ast.evaluate(values);

    expect(result).toBe(expected);
  });
});
