package Routes

import (
	"halloCorona/Handlers"
	middleware "halloCorona/Pkg/Midleware"
	"halloCorona/Pkg/Mysql"
	"halloCorona/Repositories"

	"github.com/gorilla/mux"
)

func ArticleRoutes(r *mux.Router) {
	articleRepositori := Repositories.RepositoryArticle(Mysql.DB)
	h := Handlers.HandlerArticle(articleRepositori)

	r.HandleFunc("/Articles", h.FindArticle).Methods("GET")
	r.HandleFunc("/Article/{id}", h.GetArticleById).Methods("GET")
	r.HandleFunc("/ArticleByUser/{user_id}", h.GetArticleByUser).Methods("GET")
	r.HandleFunc("/Article", middleware.Auth(middleware.ArticleImage(h.CreateArticle))).Methods("POST")
	r.HandleFunc("/Article/{id}", middleware.Auth(h.DeleteArticle)).Methods("DELETE")
}
