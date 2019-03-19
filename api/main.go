package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
	_ "github.com/lib/pq"
)

func init() {
	db, err := sql.Open("postgres", "")
	if err != nil {
		log.Fatal("Error opening connection", err)
	}
	fmt.Println(db)
	err = db.Ping()
	if err != nil {
		log.Fatal("Error doing ping", err)
	}
	defer db.Close()

}
func main() {
	router := mux.NewRouter()
	router.HandleFunc("/healthz", HealthCheck)
	router.HandleFunc("/new", NewScore).Methods("POST")
	router.HandleFunc("/scores", ListScores)
	if err := http.ListenAndServe(":2048", router); err != nil {
		log.Fatal(err)
	}
}
