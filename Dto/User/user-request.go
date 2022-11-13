package userDto

type CreateUserRequest struct {
	Fullname string `json:"fullname" form:"fullname" validate:"required"`
	Username string `json:"username" form:"username" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Status   string `json:"status" form:"status"`
	Gender   string `json:"gender" form:"gender"`
	Phone    string `json:"phone" form:"phone"`
	Address  string `json:"address" form:"address"`
}

type UpdateUserRequest struct {
	Fullname string `json:"fullname" form:"fullname"`
	Username string `json:"username" form:"username"`
	Email    string `json:"email" form:"email"`
	Gender   string `json:"gender" form:"gender"`
	Phone    string `json:"phone" form:"phone"`
	Address  string `json:"address" form:"address"`
}
