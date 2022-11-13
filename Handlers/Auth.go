package Handlers

import (
	"encoding/json"
	"fmt"
	authDto "halloCorona/Dto/Auth"
	Dto "halloCorona/Dto/Result"
	"halloCorona/Models"
	"halloCorona/Pkg/Bcrypt"
	jwtToken "halloCorona/Pkg/Jwt"
	"halloCorona/Repositories"
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
)

type handlerauth struct {
	AuthRepository Repositories.AuthRepository
}

func HandlerAuth(AuthRepository Repositories.AuthRepository) *handlerauth {
	return &handlerauth{AuthRepository}
}

func ConvertAuthResponse(u Models.User) authDto.LoginResponse {
	return authDto.LoginResponse{
		Username: u.Username,
		Email:    u.Email,
		Status:   u.Status,
	}
}

func (h *handlerauth) Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(authDto.RegisterRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	password, err := Bcrypt.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	datauser, _ := h.AuthRepository.CheckEmail(request.Email)
	if datauser.Email != "" {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusInternalServerError, Message: "Email has been registered"}
		json.NewEncoder(w).Encode(response)
		return
	}

	user := Models.User{
		Username: request.Username,
		Email:    request.Email,
		Password: password,
		Status:   request.Status,
	}

	data, err := h.AuthRepository.Register(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := Dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := Dto.SuccessResult{Code: http.StatusOK, Data: ConvertAuthResponse(data)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerauth) Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(authDto.LoginRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	user := Models.User{
		Username: request.Username,
		Password: request.Password,
	}

	user, err := h.AuthRepository.Login(user.Username)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	isValid := Bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: "wrong username or password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return
	}

	loginResponse := authDto.LoginResponse{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		Status:   user.Status,
		Token:    token,
	}

	w.Header().Set("Content-Type", "application/json")
	response := Dto.SuccessResult{Code: http.StatusOK, Data: loginResponse}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerauth) CheckAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	user, err := h.AuthRepository.GetUsers(userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := Dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	CheckAuthResponse := authDto.CheckAuthResponse{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		Status:   user.Status,
	}

	w.Header().Set("Content-Type", "application/json")
	response := Dto.SuccessResult{Code: http.StatusOK, Data: CheckAuthResponse}
	json.NewEncoder(w).Encode(response)
}
