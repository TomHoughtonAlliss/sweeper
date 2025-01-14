package main

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {
	if err := godotenv.Load(".env"); err != nil && !os.IsNotExist(err) {
		panic("failed to load .env")
	}

	e := echo.New()

	e.Debug = true

	address := os.Getenv("SERVER_URL")

	e.Logger.Fatal(e.Start(address))
}