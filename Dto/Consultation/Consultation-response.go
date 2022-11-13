package consultDto

type ConsultResponse struct {
	Fullname         string `json:"fullname" `
	Phone            string `json:"phone" `
	BornDate         string `json:"born_date" `
	Age              int    `json:"age" `
	Height           int    `json:"height" `
	Weight           int    `json:"weight" `
	Gender           string `json:"gender" `
	Subject          string `json:"subject"`
	LiveConsultation string `json:"live_consultation" `
	Description      string `json:"desc" `
	Status           string `json:"status"`
	Replay           string `json:"replay"`
	Link             string `json:"link" `
	UserID           int    `json:"user_id" `
}
