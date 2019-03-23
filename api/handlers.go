package main

import (
	"fmt"
	"net/http"
	"strconv"
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
	_msg, _state, _value := req.FormValue("msg"), req.FormValue("state"), req.FormValue("value")
	fmt.Println("msg:", _msg)
	fmt.Println(_state, ":", _value)
	value, err := strconv.Atoi(_value)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, err.Error())
	}
	score = Score{
		State: _state,
		Value: value,
		Msg:   _msg,
	}

	// _decoder := json.NewDecoder(req.Body)
	// if err := _decoder.Decode(&score); err != nil {
	// 	RespondWithError(w, http.StatusBadRequest, "Invalid Payload Data")
	// 	return
	// }
	err = score.Insert(app.db)
	if err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid Payload Data"+err.Error())
		return
	}
	RespondWithJSON(w, http.StatusCreated, score)
	// w.WriteHeader(http.StatusOK)
	// w.Header().Set("Content-Type", "application/json")
	// json.NewEncoder(w).Encode(map[string]string{"scores": "..."})
}
