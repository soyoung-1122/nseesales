package contract

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"

)
//db 접속 정보
type DBInfo struct {
	User         string
	Pwd          string
	Url          string
	Engine       string
	Database     string
}

type DB struct {
	*sql.DB
}

//유저 정보
type UserInfo struct {
	UserName				string  `json:"username"`
	Password 				string  `json:"password"`
	Role string  `json:"role"`
}