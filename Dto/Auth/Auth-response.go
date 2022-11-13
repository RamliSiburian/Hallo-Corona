package authDto

type LoginResponse struct {
	ID       int    `json:"id"`
	Username string `json:"username" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Status   string `json:"status" gorm:"type: varchar(255)"`
	Token    string `json:"token"`
}
type CheckAuthResponse struct {
	ID       int    `gorm:"type: int" json:"id"`
	Username string `json:"username"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Status   string `gorm:"type: varchar(50)"  json:"status"`
}
