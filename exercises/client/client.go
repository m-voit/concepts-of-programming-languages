package client

import (
	"github.com/m-voit/concepts-of-programming-languages/exercises/mail"
	"github.com/m-voit/concepts-of-programming-languages/exercises/utils"
)

// Registry :
var Registry = utils.NewRegistry()

// SendMail :
func SendMail(address, message string) {
	var sender = Registry.Get("mail.Sender").(mail.Sender)

	mailaddrs := mail.Address{Address: address}

	sender.SendMail(mailaddrs, message)
}
