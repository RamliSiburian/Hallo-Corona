package userDto

type UserResponse struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Gender   string `json:"gender"`
	Status   string `json:"status"`
	Phone    string `json:"phone"`
	Address  string `json:"address"`
}
