package Routes

import (
	"halloCorona/Handlers"
	middleware "halloCorona/Pkg/Midleware"
	"halloCorona/Pkg/Mysql"
	"halloCorona/Repositories"

	"github.com/gorilla/mux"
)

func ConsultRoutes(r *mux.Router) {
	consultRepositori := Repositories.RepositoryConsult(Mysql.DB)
	h := Handlers.HandlerConsult(consultRepositori)

	r.HandleFunc("/Consults", h.FindConsult).Methods("GET")
	r.HandleFunc("/Consult/{id}", h.GetConsult).Methods("GET")
	r.HandleFunc("/ConsultByUser/{user_id}", h.GetConsultByUser).Methods("GET")
	r.HandleFunc("/Consult", middleware.Auth(h.CreateConsult)).Methods("POST")
	r.HandleFunc("/Consult/{id}", h.UpdateConsult).Methods("PATCH")
 
}
