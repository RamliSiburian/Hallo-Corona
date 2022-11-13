package Models

import "time"

type Consultation struct {
	ID               int          `json:"id"`
	Fullname         string       `json:"fullname" gorm:"type: varchar(255)"`
	Phone            string       `json:"phone" gorm:"type: varchar(255)"`
	BornDate         string       `json:"born_date" `
	Age              int          `json:"age"`
	Height           int          `json:"height"`
	Weight           int          `json:"weight"`
	Gender           string       `json:"gender" gorm:"type: varchar(255)"`
	Subject          string       `json:"subject" gorm:"type: varchar(255)"`
	LiveConsultation string       `json:"live_consultation"`
	Description      string       `json:"description" gorm:"type: varchar(255)"`
	Status           string       `json:"status" gorm:"type: varchar(255)"`
	Replay           string       `json:"replay" gorm:"type: varchar(255)"`
	DoctorID         int          `json:"doctor_id" gorm:"type: varchar(255)"`
	Link             string       `json:"link" gorm:"type: varchar(255)"`
	UserID           int          `json:"user_id"`
	User             UserResponse `json:"user"`
	CreateAt         time.Time    `json:"create_at"`
}
