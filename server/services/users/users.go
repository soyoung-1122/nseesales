package main

import (
	"net/http"
	"os"
	"database/sql"
	// "encoding/json"
	"log"
	"os/signal"
	"time"
	"context"
	"fmt"
	"path/filepath"

	"github.com/nalin/services/contract"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/go-sql-driver/mysql"
)
func init() {
	path_dir := "../"
	if err := godotenv.Load(filepath.Join(path_dir, ".env")); err != nil {
		log.Print("No .env file found")
	}
}

func main() {
	appAddr := ":" + os.Getenv("MICROTEST_PORT")
	fmt.Println("listening :" + os.Getenv("MICROTEST_PORT"))
	r := gin.Default()

	users := r.Group("/api/v1/users") 
	{
		users.POST("/join", signupHandler)
	}

	srv := &http.Server{
		Addr:              appAddr,
		Handler:           r,
	}
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Println("Shutdown Server ...")

	ctx, cancel := context.WithTimeout(context.Background(), 10 * time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown:", err)
	}
	log.Println("Server exiting")
}

func signupHandler(c *gin.Context) {
	// 서비스 별로 데이터베이스 사용한다고 하면 매개변수로 주는 게 나을듯 테이블만 다르게 한다면 추후 수정
	usr := contract.UserInfo{}
	c.BindJSON(&usr)
	   
	queryString := "INSERT INTO user (username, password, role)" +
								"VALUES(" + 
								`"` + usr.UserName + `",` +
								`"` + usr.Password + `",` +
								`"` + usr.Role + `")`
	fmt.Println(queryString)
	db, err := OpenDB("test")
	checkErr(err)

	db.Ping()

	result, err := db.Exec(queryString)
	fmt.Println(result)
	checkErr(err)
	
	c.JSON(http.StatusOK, "회원가입 완료!")

	CloseDB(db)
}

func getUserList(c *gin.Context) {
	// metadata,_ := h.tk.ExtractTokenMetadata(c.Request)

	// if metadata.Role == "admin" {
	// 	c.JSON(http.StatusCreated, "welcome to admin page")
	// }
	// if metadata.Role == "user" {
	// 	c.JSON(http.StatusCreated, "welcome to user page")
	// }
}

func getDBInfo(database string) (string, string) {
	db := contract.DBInfo {
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


