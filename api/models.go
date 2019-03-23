package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/pkg/errors"
)

func initdb() (db *sql.DB) {

	db, err := sql.Open("postgres", "")
	if err != nil {
		log.Fatal("Error opening connection", err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal("Error doing ping", err)
	}
	log.Println("Database connection ok...")

	if err = CreateTable(db); err != nil {
		log.Fatal("Error creating table", err)
	}
	return
}

type Score struct {
	Id        int64  `json:"id"`
	State     string `json:"state"`
	Value     int    `json:"value"`
	Msg       string `json:"msg"`
	CreatedAt string `json:"created_at"`
}
type Scores []Score

func CreateTable(db *sql.DB) (err error) {
	const qry = `
CREATE TABLE IF NOT EXISTS scores (
	id serial PRIMARY KEY,
    state varchar,
    value int,
	msg text ,
	created_at timestamp with time zone DEFAULT current_timestamp
)`

	// Exec executes a query without returning any rows.
	if _, err = db.Exec(qry); err != nil {
		err = errors.Wrapf(err,
			"Table creation query failed (%s)",
			qry)
		return
	}
	return
}

func (s *Score) Insert(db *sql.DB) (err error) {
	const qry = `
INSERT INTO scores (
	state,value,msg
)
VALUES (
	$1, $2, $3
)
RETURNING
	id, state,value, msg, created_at`
	err = db.QueryRow(qry, s.State, s.Value, s.Msg).Scan(&s.Id, &s.State, &s.Value, &s.Msg, &s.CreatedAt)
	if err != nil {
		err = errors.Wrapf(err,
			"Couldn't insert user row into DB (%s)", s)
		return
	}
	return
}

func List(db *sql.DB) (scores Scores, err error) {

	const qry = `SELECT * FROM scores limit 10`
	rows, err := db.Query(qry)
	if err != nil {
		err = errors.Wrapf(err, "Couldn't read from  scores")
		return
	}
	defer rows.Close()
	for rows.Next() {
		s := Score{}
		err = rows.Scan(&s.Id, &s.State, &s.Value, &s.Msg, &s.CreatedAt)
		if err != nil {
			return
		}
		fmt.Println(s)
		scores = append(scores, s)

	}
	err = rows.Err()
	if err != nil {
		return
	}
	return
}
