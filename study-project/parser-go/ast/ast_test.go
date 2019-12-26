package ast

import (
  "testing"
)

func TestAST(t *testing.T) {

  // AST for expression: "A AND B OR !C"
  ast := Or{And{Val{"A"}, Val{"B"}}, Not{Val{"C"}}}

  // Table to test all combinations for A, B, C -> 2^3 = 8 combinations.
  // Format of Table { Value for A, Value for B, Value for C, Expected Result }
  truthTable := [][]bool{
    {false, false, false, true},
    {false, false, true, false},
    {false, true, true, false},
    {false, true, false, true},
    {true, false, false, true},
    {true, true, false, true},
    {true, false, true, false},
    {true, true, true, true},
  }

  // Test all possible combinations
  for _, tt := range truthTable {

    vars := map[string]bool{"A": tt[0], "B": tt[1], "C": tt[2]}
    expected := tt[3]
    result := ast.Eval(vars)

    if result != expected {
      t.Errorf("Expected %v but got %v. (Expression := %v, Vars := %v)", expected, result, ast, vars)
    }
  }
}
