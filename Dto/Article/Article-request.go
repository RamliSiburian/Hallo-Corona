package articleDto

type ArticleRequest struct {
	Title  string `json:"title" form:"title" gorm:"type: varchar(255)" validate:"required"`
	Desc   string `json:"desc" gorm:"type:text" form:"desc" validate:"required"`
	Hastag string `json:"hastag" gorm:"type:text" form:"hastag" validate:"required"`
	UserID int    `json:"user_id" form:"user_id"`
}
