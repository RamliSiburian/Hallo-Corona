package Repositories

import (
	"halloCorona/Models"

	"gorm.io/gorm"
)

type ArticleRepository interface {
	FindArticle() ([]Models.Article, error)
	GetArticleById(ID int) (Models.Article, error)
	GetArticleByUser(UserID int) ([]Models.Article, error)
	CreateArticle(article Models.Article) (Models.Article, error)
	DeleteArticle(article Models.Article) (Models.Article, error)
}

func RepositoryArticle(db *gorm.DB) *users {
	return &users{db}
}

func (r *users) FindArticle() ([]Models.Article, error) {
	var articles []Models.Article
	err := r.db.Preload("User").Order("id desc").Find(&articles).Error

	return articles, err
}

func (r *users) GetArticleByUser(UserID int) ([]Models.Article, error) {
	var article []Models.Article
	err := r.db.Where("user_id=?", UserID).Order("id desc").Preload("User").Find(&article).Error

	return article, err
}

func (r *users) GetArticleById(ID int) (Models.Article, error) {
	var article Models.Article
	err := r.db.Preload("User").First(&article, ID).Error

	return article, err
}

func (r *users) CreateArticle(article Models.Article) (Models.Article, error) {
	err := r.db.Create(&article).Error

	return article, err
}

func (r *users) DeleteArticle(article Models.Article) (Models.Article, error) {
	err := r.db.Delete(&article).Error

	return article, err
}
