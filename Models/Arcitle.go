package Models

import "time"

type Article struct {
	ID       int          `json:"id" gorm:"primary_key:auto_increment"`
	Title    string       `json:"title" gorm:"type: varchar(255)"`
	Image    string       `json:"image" gorm:"type: varchar(255)"`
	Desc     string       `json:"desc" gorm:"type: text"`
	Hastag   string       `json:"hastag" gorm:"type: varchar(255)"`
	CreateAt time.Time    `json:"create_at"`
	UserId   int          `json:"user_id"`
	User     UserResponse `json:"user"`
}
