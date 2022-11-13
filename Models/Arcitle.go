package Models

import "time"

type Article struct {
	ID        int          `json:"id"`
	Title     string       `json:"title" gorm:"type: varchar(255)"`
	Image     string       `json:"image" gorm:"type: varchar(255)"`
	Desc      string       `json:"desc" gorm:"type: varchar(255)"`
	Hastag    string       `json:"hastag" gorm:"type: varchar(255)"`
	CreatedAt time.Time    `json:"delete_at"`
	UserId    int          `json:"user_id"`
	User      UserResponse `json:"user"`
}
