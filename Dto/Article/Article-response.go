package articleDto

type ArticleResponse struct {
	Title  string `json:"title"`
	Desc   string `json:"desc"`
	Hastag string `json:"hastag"`
	UserID int    `json:"user_id"`
}
