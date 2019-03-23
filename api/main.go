package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

type App struct {
	router *mux.Router
	db     *sql.DB
}

func initApp() App {
	return App{
		router: mux.NewRouter(),
		db:     initdb(),
	}
}

var app App

func main() {
	app = initApp()
	app.router.HandleFunc("/healthz", HealthCheck)
	app.router.HandleFunc("/new", NewScore).Methods("POST", "FETCH")
	app.router.HandleFunc("/scores", ListScores)
	corsHandler := cors.Default().Handler(app.router)

	if err := http.ListenAndServe(":"+os.Getenv("PORT"), corsHandler); err != nil {
		log.Fatal(err)
	}

}
