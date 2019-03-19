package main

import (
	"encoding/json"
	"log"
	"net/http"
)

//RespondWithError to respond back with an error
func RespondWithError(w http.ResponseWriter, code int, message string) {
	log.Println("Sending Error!")
	log.Println(message)
	RespondWithJSON(w, code, map[string]string{"error": message, "success": "false"})
}

// RespondWithJSON to respond back with json data
func RespondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	log.Println("Sending Response!")
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
