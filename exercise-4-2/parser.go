package parser

import "github.com/m-voit/concepts-of-programming-languages/exercise-4-1/lexer"

// <expression> ::= <term> { <or> <term> }
// <term> ::= <factor> { <and> <factor> }
// <factor> ::= <var> | <not> <factor> | (<expression>)
// <or>  ::= '|'
// <and> ::= '&'
// <not> ::= '!'
// <var> ::= '[a-zA-Z0-9]*'

type node interface {
	Eval(vars map[string]bool) bool
}

type or struct {
	leftside node
	rightside node
}

type and struct {
	leftside node
	rightside node
}

func (or *or) Eval(vars map[string]bool) bool {
	return or.leftside.Eval(vars) || or.rightside.Eval(vars)
}

func (and *and) Eval(vars map[string]bool) bool {
	return or.leftside.Eval(vars) && or.rightside.Eval(vars)
}

// Eval : Missing vars wil be evaluated to false.
func (value *val) Eval(vars map[string]bool) bool {
	return vars[value.name]
}

// Parser :
type Parser struct {
	rootNode node
	token string
	lexer *lexer.lexer
}

// CreateParser :
func CreateParser(lexer *lexer.lexer) *Parser {
	parser := Parser{lexer: lexer}
	parser.parse()
	return &parser
}

// Eval :
func (parser *Parser) Eval(vars map[string]bool) bool {
	return parser.rootNode.Eval(vars)
}

// String :
func (parser *Parser) String() string {
	return fmt.Sprintf(format: "%v", parser.rootNode)
}

func (parser *Parser) expression() {
	parser.term()
	for parser.token == "|" {
		leftside := parser.rootNode
		parser.term()
		rightside := parser.rootNode
		parser.rootNode = &or{leftside, rightside}
	}
}

parser := CreateParser(CreateLexer("a & b | !c"))
vars := map[string]bool{"a": true, "b": true, "c": false}
parser.Eval(vars)
