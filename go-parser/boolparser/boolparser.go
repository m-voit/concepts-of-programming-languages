package boolparser

import (
	"container/list"

	"github.com/m-voit/concepts-of-programming-languages/go-parser/ast"
	"github.com/m-voit/concepts-of-programming-languages/go-parser/parser"
)

// parseExpression parses the following grammar: Expression := Or Spaces*
//
// The syntax tree is exactly the one returned by Or.
func parseExpression(Input parser.Input) parser.Result {
	return parser.Parser(parseOr).AndThen(parser.ExpectSpaces.Optional()).First()(Input)
}

// parseOr parses the following grammar: Or := And ^ ("|" ^ Or)?
//
// If the parser for ("|" ^ Or)? produces nothing then parseOr will return the
// tree returned by And. Otherwise parseOr will return a new Or Node containing
// the sub-trees returned by the recursive calls. parseOr uses expect to parse
// the symbol "|", i. e. it actually allows for Space* ^ "|".
func parseOr(Input parser.Input) parser.Result {
	return parser.Parser(parseAnd).AndThen(expect("|").AndThen(parseOr).Second().Optional()).Convert(makeOr)(Input)
}

// parseAnd parses the following grammar: And := Not ^ ("&" ^ And)?
//
// If the parser for ("&" ^ And)? produces nothing then parseAnd will return the
// tree returned by Not. Otherwise parseAnd will return a new And Node containing
// the sub-trees returned by the recursive calls. parseAnd uses expect to parse
// the symbol "&", i. e. it actually allows for Space* ^ "&".
func parseAnd(Input parser.Input) parser.Result {
	return parser.Parser(parseNot).AndThen(expect("&").AndThen(parseAnd).Second().Optional()).Convert(makeAnd)(Input)
}

// parseNot parses the following grammar: Not := "!"* ^ Atom
//
// It delegates parsing "!"* to parseExclamationMarks and the construction of Not
// nodes to makeNots. If there's no exclamation mark then parseNot will return
// the tree parsed by parseAtom. Otherwise parseNot will wrap the atom in as many
// Not nodes as there are exclamation marks.
func parseNot(Input parser.Input) parser.Result {
	return parseExclamationMarks.AndThen(parseAtom).Convert(func(arg interface{}) interface{} {
		var pair = arg.(parser.Pair)
		return makeNot(pair.First.(int), pair.Second.(ast.Node))
	})(Input)
}

// parseExclamationMarks parses the following grammar: "!"*
//
// It returns the number of exclamation marks in Result.Result as an int.
// parseExclamationMarks uses expect to parse the symbol "!", i. e. it actually
// allows for Space* ^ "!".
var parseExclamationMarks parser.Parser = func(Input parser.Input) parser.Result {
	return expect("!").Repeated().Convert(func(arg interface{}) interface{} {
		var list = arg.(*list.List)
		return list.Len()
	})(Input)
}

// parseAtom parses the followiong grammar: Atom := Variable | "(" ^ Expression ^ ")"
//
// The parenthesis won't appear in the abstract syntax tree. parseAtom uses
// Parser.First() and Parser.Second() to extract the tree returned by parseExpression.
func parseAtom(Input parser.Input) parser.Result {
	return parseVariable.OrElse(expect("(").AndThen(parseExpression).AndThen(expect(")")).First().Second())(Input)
}

// parseVariable parses the following grammar: Variable := [a-zA-Z_][a-zA-Z_0-9]*
//
// It delegates parsing the variable name to ExpectIdentifier from the parser
// combinators package and uses the Convert method on parsers to create the ast.Val node.
var parseVariable parser.Parser = func(Input parser.Input) parser.Result {
	return parser.MaybeSpacesBefore(parser.ExpectIdentifier).Convert(func(arg interface{}) interface{} {
		var name = arg.(string)
		return ast.Val{Name: name}
	})(Input)
}

// makeNot wraps the node into num ast.Not nodes.
func makeNot(num int, node ast.Node) ast.Node {
	if num <= 0 {
		return node
	}
	return ast.Not{Ex: makeNot(num-1, node)}
}

// makeAnd takes a Pair of ast.Node as an argument and returns an
// ast.Node. If the second component of the pair is equal to Nothing{} then it
// returns the first component of the Pair. If the second component is a Node
// then makeAnd will create an ast.And node containing the first and the second
// component of the Pair as sub-nodes.
func makeAnd(argument interface{}) interface{} {
	var pair = argument.(parser.Pair)
	if pair.Second == (parser.Nothing{}) {
		return pair.First
	}
	var firstNode = pair.First.(ast.Node)
	var secondNode = pair.Second.(ast.Node)
	return ast.And{LHS: firstNode, RHS: secondNode}

}

// makeOr takes a Pair of ast.Node as an argument and returns an
// ast.Node. If the second component of the pair is equal to Nothing{} then it
// returns the first component of the Pair. If the second component is a Node
// then makeOr will create an ast.Or node containing the first and the second
// component of the Pair as sub-nodes.
func makeOr(argument interface{}) interface{} {
	var pair = argument.(parser.Pair)
	if pair.Second == (parser.Nothing{}) {
		return pair.First
	}
	var firstNode = pair.First.(ast.Node)
	var secondNode = pair.Second.(ast.Node)
	return ast.Or{LHS: firstNode, RHS: secondNode}
}

// expect expects the string s at the beginning of the Input and ignores leading spaces.
func expect(s string) parser.Parser {
	return parser.MaybeSpacesBefore(parser.ExpectString(s))
}
