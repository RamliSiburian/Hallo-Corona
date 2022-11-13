package Repositories

import (
	"halloCorona/Models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user Models.User) (Models.User, error)
	Login(username string) (Models.User, error)
	GetUsers(ID int) (Models.User, error)
	CheckEmail(email string) (Models.User, error)
}

func RepositoryAuth(db *gorm.DB) *users {
	return &users{db}
}

func (r *users) Register(user Models.User) (Models.User, error) {
	err := r.db.Create(&user).Error
	return user, err
}

func (r *users) Login(username string) (Models.User, error) {
	var user Models.User
	err := r.db.First(&user, "username=?", username).Error
	return user, err	
}

func (r *users) GetUsers(ID int) (Models.User, error) {
	var user Models.User
	err := r.db.First(&user, ID).Error

	return user, err
}

func (r *users) CheckEmail(email string) (Models.User, error) {
	var user Models.User
	err := r.db.First(&user, "email=?", email).Error

	return user, err
}
