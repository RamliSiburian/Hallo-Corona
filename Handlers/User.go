package Handlers

import (
	"context"
	"encoding/json"
	"fmt"
	Dto "halloCorona/Dto/Result"
	userDto "halloCorona/Dto/User"
	"halloCorona/Models"
	"halloCorona/Repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gorilla/mux"
)

type handleruser struct {
	UserRepository Repositories.UserRepository
}

func HandlerUser(UserRepository Repositories.UserRepository) *handleruser {
	return &handleruser{UserRepository}
}

func (h *handleruser) FindUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	user, err := h.UserRepository.FindUser()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: user}
	json.NewEncoder(w).Encode(response)
}

func (h *handleruser) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	var user Models.User
	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// user.Image = os.Getenv("PATH_FILE_USER") + user.Image
	user.Image = os.Getenv("PATH_FILE") + user.Image

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: user}
	json.NewEncoder(w).Encode(response)
}

func (h *handleruser) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	filepath := ""
	userImage := r.Context().Value("dataFile")
	if userImage != nil {
		filepath = userImage.(string)
	}

	request := userDto.UpdateUserRequest{
		Fullname: r.FormValue("fullname"),
		Username: r.FormValue("username"),
		Gender:   r.FormValue("gender"),
		Phone:    r.FormValue("phone"),
		Address:  r.FormValue("address"),
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	user, err := h.UserRepository.GetUser(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "waysfood_file/userImage"})

	if err != nil {
		fmt.Println(err.Error())
	}

	if request.Fullname != "" {
		user.Fullname = request.Fullname
	}
	if request.Username != "" {
		user.Username = request.Username
	}
	if request.Phone != "" {
		user.Phone = request.Phone
	}
	if request.Gender != "" {
		user.Gender = request.Gender
	}
	if filepath != "" {
		user.Image = resp.SecureURL
	}
	if request.Address != "" {
		user.Address = request.Address
	}

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}
