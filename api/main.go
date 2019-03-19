package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
	_ "github.com/lib/pq"
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
	app.router.HandleFunc("/new", NewScore).Methods("POST")
	app.router.HandleFunc("/scores", ListScores)
	if err := http.ListenAndServe(":2048", app.router); err != nil {
		log.Fatal(err)
	}

}
