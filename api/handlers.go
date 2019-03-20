package main

import (
	"fmt"
	"net/http"
)

func ListScores(w http.ResponseWriter, req *http.Request) {

	scores, err := List(app.db)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	RespondWithJSON(w, http.StatusOK, scores)
}

func NewScore(w http.ResponseWriter, req *http.Request) {

	var score Score
	_msg, _emoji := req.FormValue("msg"), req.FormValue("emoji")
	fmt.Println("msg:", _msg)
	fmt.Println("emoji:", _emoji)
	score = Score{Emoji: _emoji, Msg: _msg}

	// _decoder := json.NewDecoder(req.Body)
	// if err := _decoder.Decode(&score); err != nil {
	// 	RespondWithError(w, http.StatusBadRequest, "Invalid Payload Data")
	// 	return
	// }
	err := score.Insert(app.db)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid Payload Data"+err.Error())
		return
	}
	RespondWithJSON(w, http.StatusCreated, score)
	// w.WriteHeader(http.StatusOK)
	// w.Header().Set("Content-Type", "application/json")
	// json.NewEncoder(w).Encode(map[string]string{"scores": "..."})
}
