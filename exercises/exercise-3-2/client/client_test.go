package client

import (
	"testing"
	"github.com/m-voit/concepts-of-programming-languages/oop/mail/smtp"
)

func init() {
	Registry.Register("mail.Sender", new(smtp.MailSenderImpl))
}

func TestMail(t *testing.T) {
	SendMail("johannes.weigend@qaware.de", "Hello from Go!")
}
