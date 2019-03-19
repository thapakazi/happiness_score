package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/healthz", HealthCheck)
	router.HandleFunc("/new", NewScore).Methods("POST")
	router.HandleFunc("/scores", ListScores)
	if err := http.ListenAndServe(":2048", router); err != nil {
		log.Fatal(err)
	}
}
