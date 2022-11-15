package consultDto

type ConsultRequest struct {
	Fullname         string `json:"fullname" form:"fullname" gorm:"type: varchar(255)"`
	Phone            int    `json:"phone" form:"phone"`
	BornDate         string `json:"born_date" `
	Age              int    `json:"age" form:"age"`
	Height           int    `json:"height" form:"height"`
	Weight           int    `json:"weight" form:"weight"`
	Gender           string `json:"gender" form:"gender" gorm:"type: varchar(255)"`
	Subject          string `json:"subject" form:"subject" gorm:"type: varchar(255)"`
	LiveConsultation string `json:"live_consultation" `
	Description      string `json:"description" gorm:"type:text" form:"description"`
	Status           string `json:"status" gorm:"type:text" form:"status"`
	Replay           string `json:"replay" gorm:"type:text" form:"replay"`
	Link             string `json:"link" gorm:"type:text" form:"link"`
	UserID           int    `json:"user_id" form:"user_id"`
}

type ConsultUpdateRequest struct {
	Status   string `json:"status" gorm:"type:text" form:"status"`
	Replay   string `json:"replay" gorm:"type:text" form:"replay"`
	Link     string `json:"link" gorm:"type:text" form:"link"`
	DoctorID int    `json:"doctor_id" gorm:"type:text" form:"doctor_id"`
}
