package Routes

import "github.com/gorilla/mux"

func RouteInit(r *mux.Router) {
	AuthRoutes(r)
	UserRoutes(r)
	ArticleRoutes(r)
	ConsultRoutes(r)
}
