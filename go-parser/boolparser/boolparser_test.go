package boolparser

import (
	"testing"

	"github.com/m-voit/concepts-of-programming-languages/go-parser/ast"
	"github.com/m-voit/concepts-of-programming-languages/go-parser/parser"
)

func TestMakeOr(t *testing.T) {
	var result = makeOr(parser.Pair{ast.Val{"a"}, ast.Val{"b"}})
	var expected ast.Node = ast.Or{ast.Val{"a"}, ast.Val{"b"}}
	if result != expected {
		t.Errorf(
			"makeOr (Pair { Val { \"a\" }, Val { \"b\" }}) failed! Expected %v"+
				" but got wrong result %v !", expected, result)
	}
	result = makeOr(parser.Pair{ast.Val{"a"}, parser.Nothing{}})
	expected = ast.Val{"a"}
	if result != expected {
		t.Errorf(
			"makeOr (Pair { Val { \"a\" }, Nothing{} }) failed! Expected %v "+
				" but got wrong result %v !", expected, result)
	}
}

func TestMakeAnd(t *testing.T) {
	var result = makeAnd(parser.Pair{ast.Val{"a"}, ast.Val{"b"}})
	var expected ast.Node = ast.And{ast.Val{"a"}, ast.Val{"b"}}
	if result != expected {
		t.Errorf(
			"makeAnd (Pair { Val { \"a\" }, Val { \"b\" }}) failed! Expected %v"+
				" but got wrong result %v !", expected, result)
	}
	result = makeAnd(parser.Pair{ast.Val{"a"}, parser.Nothing{}})
	expected = ast.Val{"a"}
	if result != expected {
		t.Errorf(
			"makeAnd (Pair { Val { \"a\" }, Nothing{} }) failed! Expected %v "+
				" but got wrong result %v !", expected, result)
	}
}

func TestMakeNot(t *testing.T) {
	var result = makeNot(0, ast.Val{"a"})
	var expected ast.Node = ast.Val{"a"}
	if result != expected {
		t.Errorf("makeNot (0, Val { \"a\" }) failed! Expected %v "+
			"but got wrong result %v !", expected, result)
	}
	expected = ast.Not{ast.Not{ast.Not{ast.Val{"a"}}}}
	result = makeNot(3, ast.Val{"a"})
	if result != expected {
		t.Errorf("makeNot (3, Val { \"a\" }) failed! Expected %v "+
			"but got wrong result %v !", expected, result)
	}
}

func TestParseVariable(t *testing.T) {
	var text = "xyz"
	var expected ast.Node = ast.Val{"xyz"}
	var result = parseVariable(parser.StringToInput(text))
	if result.Result != expected {
		t.Errorf("parseVariable on input \"%v\" failed! Expected %v "+
			"but got wrong result %v !", text, expected, result.Result)
	}
	if result.RemainingInput != nil {
		var inp = result.RemainingInput.(parser.RuneArrayInput)
		var rest = inp.Text[inp.CurrentPosition:]
		t.Errorf("parseVariable didn't eat all the input. Leftover: \"%v\"",
			string(rest))
	}
}

func TestParseExclamationMarks(t *testing.T) {
	var text = "!!!x"
	var expected int = 3
	var result = parseExclamationMarks(parser.StringToInput(text))
	if result.Result != expected {
		t.Errorf("parseExclamationMarks on input \"%v\" failed! Expected %d "+
			"but got wrong result %d !", text, expected, result.Result)
	}
	if result.RemainingInput != nil {
		var inp = result.RemainingInput.(parser.RuneArrayInput)
		var rest = inp.Text[inp.CurrentPosition:]
		if "x" != string(rest) {
			t.Errorf("parseExclamationMarks ate the wrong amout of input! "+
				"Leftover: \"%v\"", string(rest))
		}
	} else {
		t.Errorf("parseExclamationMarks mustn't eat all the input of \"%v\" "+
			"but it did!", text)
	}

}

func testExp(t *testing.T, text string, expected ast.Node) {
	var result = parseExpression(parser.StringToInput(text))
	if result.Result != expected {
		t.Errorf("parseExpression on input \"%v\" failed! Expected %v "+
			"but got wrong result %v !", text, expected, result.Result)
	}
	if result.RemainingInput != nil {
		var inp = result.RemainingInput.(parser.RuneArrayInput)
		var rest = inp.Text[inp.CurrentPosition:]
		t.Errorf("parseExpression didn't eat all the input. "+
			"Leftover: \"%v\"", string(rest))
	}
}

func TestParseExpression(t *testing.T) {
	testExp(t, "!a", ast.Not{ast.Val{"a"}})
	testExp(t, "a&b", ast.And{ast.Val{"a"}, ast.Val{"b"}})
	testExp(t, "a|b", ast.Or{ast.Val{"a"}, ast.Val{"b"}})
	testExp(t, " a &  b", ast.And{ast.Val{"a"}, ast.Val{"b"}})
	testExp(t, "a   ", ast.Val{"a"})
	testExp(t, "a&b&c", ast.And{ast.Val{"a"}, ast.And{ast.Val{"b"}, ast.Val{"c"}}})
	testExp(t, "a&(b&c)", ast.And{ast.Val{"a"}, ast.And{ast.Val{"b"}, ast.Val{"c"}}})
	testExp(t, "(a&b)&c", ast.And{ast.And{ast.Val{"a"}, ast.Val{"b"}}, ast.Val{"c"}})
	testExp(t, "a|b|c", ast.Or{ast.Val{"a"}, ast.Or{ast.Val{"b"}, ast.Val{"c"}}})
	testExp(t, "a|(b|c)", ast.Or{ast.Val{"a"}, ast.Or{ast.Val{"b"}, ast.Val{"c"}}})
	testExp(t, "(a|b)|c", ast.Or{ast.Or{ast.Val{"a"}, ast.Val{"b"}}, ast.Val{"c"}})
	testExp(t, "!a & b|c&!(d|e)",
		ast.Or{ast.And{ast.Not{ast.Val{"a"}}, ast.Val{"b"}},
			ast.And{ast.Val{"c"}, ast.Not{ast.Or{ast.Val{"d"}, ast.Val{"e"}}}}})

}
