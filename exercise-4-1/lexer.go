package lexer

// <expression> ::= <term> { <or> <term> }
// <term> ::= <factor> { <and> <factor> }
// <factor> ::= <var> | <not> <factor> | (<expression>)
// <or>  ::= '|'
// <and> ::= '&'
// <not> ::= '!'
// <var> := '[a-zA-Z0-9]*'

// Lexer :
type Lexer struct {
	input   string
	tokens  []string
	current int
}

// CreateLexer :
func CreateLexer(input string) *Lexer {
	lexer := new(Lexer)
	lexer.input = input
	lexer.current = 0
	lexer.tokens = splitTokens(input)

	return lexer
}

// NextToken :
func (l *Lexer) NextToken() string {
	return ""
}

// S
func splitTokens(input string) []string {
	tokens := make([]string, 0)
	token := ""

	for i := 0; i < len(input); i++ {
		// cast charactes to strings
		currentChar := string(input[i])

		// ignore whitespace
		if currentChar == string(' ') {
			continue
		}

		// check if current char is a terminal symbol
		switch currentChar {
		// terminal symbol
		case string('&'), string('!'), string('|'), string('('), string(')'):

			if token != "" {
				tokens = append(tokens, token)
				token = ""
			}

			tokens = append(tokens, string(currentChar))

			break

		default:
			// no terminal symbol
			token += string(currentChar)
		}
	}

	if token != "" {
		tokens = append(tokens, token)
		token = ""
	}

	return tokens
}
