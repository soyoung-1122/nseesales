package db

import (
	"os"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

type DBInfo struct {
	User         string
	Pwd          string
	Url          string
	Engine       string
	Database     string
}

func getDBInfo(database string) (string, string) {
	db := DBInfo {
			User: os.Getenv("DB_HOST"),
			Pwd: os.Getenv("DB_PASSWORD"),
			Url: os.Getenv("DB_URL"),
			Engine: os.Getenv("DB_ENGINE"),
			Database: database,
		}

	return db.Engine, (
		db.User + ":" + 
		db.Pwd + 
		"@tcp(" +db.Url + ")/" +
		db.Database )
}

func OpenDB(DBconn string) (*sql.DB, error){
	engine, connectionString := getDBInfo(DBconn)

	db, err := sql.Open(engine, connectionString)
	
	checkErr(err)

	return db, err
}

func CloseDB(db *sql.DB) {
	defer db.Close()
}


func checkErr(err error) {
	if err != nil {
			panic(err)
	}
}