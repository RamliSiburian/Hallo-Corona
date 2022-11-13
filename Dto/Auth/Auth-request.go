package authDto

type RegisterRequest struct {
	Username string `json:"username" validate:"required" gorm:"type: varchar(255)"`
	Email    string `json:"email" validate:"required" gorm:"type: varchar(255)"`
	Password string `json:"password" validate:"required" gorm:"type: varchar(255)"`
	Status   string `json:"status" validate:"required" gorm:"type: varchar(255)"`
}

type LoginRequest struct {
	Username string `json:"username" validate:"required" gorm:"type: varchar(255)"`
	Password string `json:"password" validate:"required" gorm:"type: varchar(255)"`
}
