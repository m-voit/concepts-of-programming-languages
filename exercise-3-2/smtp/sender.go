package smtp

import (
	"log"
	"github.com/m-voit/concepts-of-programming-languages/exercise-3-2/mail"
)

// MailSenderImpl :
type MailSenderImpl struct {}

// SendMail :
func (m *MailSenderImpl) SendMail(address mail.Address, message string) {
	log.Println("Sending message with SMTP to " + address.Address + " message: " + message)
	return
}
