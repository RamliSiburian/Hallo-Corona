package Handlers

import (
	"context"
	"encoding/json"
	"fmt"
	articleDto "halloCorona/Dto/Article"
	Dto "halloCorona/Dto/Result"
	"halloCorona/Models"
	"halloCorona/Repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerarticle struct {
	ArticleRepository Repositories.ArticleRepository
}

func HandlerArticle(ArticleRepository Repositories.ArticleRepository) *handlerarticle {
	return &handlerarticle{ArticleRepository}
}

func (h *handlerarticle) FindArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	articles, err := h.ArticleRepository.FindArticle()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	for i, p := range articles {
		// articles[i].Image = os.Getenv("PATH_FILE_ARTICLE") + p.Image
		articles[i].Image = os.Getenv("PATH_FILE") + p.Image
	}

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: articles}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerarticle) GetArticleById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var article Models.Article
	article, err := h.ArticleRepository.GetArticleById(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	article.Image = os.Getenv("PATH_FILE") + article.Image
	// article[i].Image = os.Getenv("PATH_FILE") + p.Image

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: article}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerarticle) GetArticleByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	user_id, _ := strconv.Atoi(mux.Vars(r)["user_id"])

	var article []Models.Article
	article, err := h.ArticleRepository.GetArticleByUser(user_id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	for i, p := range article {
		// article[i].Image = os.Getenv("PATH_FILE_ARTICLE") + p.Image
		article[i].Image = os.Getenv("PATH_FILE") + p.Image
	}

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: article}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerarticle) CreateArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	dataUpload := r.Context().Value("dataFile")
	filepath := dataUpload.(string)

	request := articleDto.ArticleRequest{
		Title:  r.FormValue("title"),
		Desc:   r.FormValue("desc"),
		Hastag: r.FormValue("hastag"),
		UserID: userId,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "halloCorona/articleImage"})

	if err != nil {
		fmt.Println(err.Error())
	}

	article := Models.Article{
		Title:  request.Title,
		Image:  resp.SecureURL,
		Desc:   request.Desc,
		UserId: userId,
	}

	article, err = h.ArticleRepository.CreateArticle(article)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	article, _ = h.ArticleRepository.GetArticleById(article.ID)

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: article}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerarticle) DeleteArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	article, err := h.ArticleRepository.GetArticleById(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	deleteArticle, err := h.ArticleRepository.DeleteArticle(article)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: deleteArticle}
	json.NewEncoder(w).Encode(response)
}
