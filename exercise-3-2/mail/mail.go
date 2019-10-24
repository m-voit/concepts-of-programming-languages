package mail

type Address struct {
	Address string
}

type Sender interface {
	SendMail(address Address, message string)
}
