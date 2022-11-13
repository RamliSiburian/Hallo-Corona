package Routes

import (
	"halloCorona/Handlers"
	middleware "halloCorona/Pkg/Midleware"
	"halloCorona/Pkg/Mysql"
	"halloCorona/Repositories"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	userRepositori := Repositories.RepositoryUser(Mysql.DB)
	h := Handlers.HandlerUser(userRepositori)

	r.HandleFunc("/Users", h.FindUser).Methods("GET")
	r.HandleFunc("/User/{id}", h.GetUser).Methods("GET")
	r.HandleFunc("/User/{id}", middleware.UploadFile(h.UpdateUser)).Methods("PATCH")
}
