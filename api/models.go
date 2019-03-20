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
	Emoji     string `json:"emoji"`
	Msg       string `json:"msg"`
	CreatedAt string `json:"created_at"`
}
type Scores []Score

func CreateTable(db *sql.DB) (err error) {
	const qry = `
CREATE TABLE IF NOT EXISTS scores (
	id serial PRIMARY KEY,
    emoji varchar,
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
	emoji,msg
)
VALUES (
	$1, $2
)
RETURNING
	id, emoji, msg, created_at`
	err = db.QueryRow(qry, s.Emoji, s.Msg).Scan(&s.Id, &s.Emoji, &s.Msg, &s.CreatedAt)
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
		err = rows.Scan(&s.Id, &s.Emoji, &s.Msg, &s.CreatedAt)
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
