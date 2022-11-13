package Repositories

import (
	"halloCorona/Models"

	"gorm.io/gorm"
)

type ConsultRepository interface {
	FindConsult() ([]Models.Consultation, error)
	GetConsult(ID int) (Models.Consultation, error)
	GetConsultByUser(UserID int) ([]Models.Consultation, error)
	CreateConsult(consult Models.Consultation) (Models.Consultation, error)
	UpdateConsult(consult Models.Consultation) (Models.Consultation, error)
}

func RepositoryConsult(db *gorm.DB) *users {
	return &users{db}
}

func (r *users) FindConsult() ([]Models.Consultation, error) {
	var consult []Models.Consultation

	err := r.db.Preload("User").Order("id desc").Find(&consult).Error
	return consult, err
}

func (r *users) CreateConsult(consult Models.Consultation) (Models.Consultation, error) {
	err := r.db.Preload("User").Create(&consult).Error

	return consult, err
}

func (r *users) GetConsult(ID int) (Models.Consultation, error) {
	var consult Models.Consultation
	err := r.db.Preload("User").First(&consult, ID).Error

	return consult, err
}

func (r *users) GetConsultByUser(UserID int) ([]Models.Consultation, error) {
	var consult []Models.Consultation
	err := r.db.Where("user_id=?", UserID).Order("id desc").Find(&consult).Error

	return consult, err
}

func (r *users) UpdateConsult(consult Models.Consultation) (Models.Consultation, error) {
	err := r.db.Save(&consult).Error

	return consult, err
}
