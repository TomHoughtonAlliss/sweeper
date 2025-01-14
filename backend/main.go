package main

import (
	"context"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// INIT ECHO SERVER
	if err := godotenv.Load(".env"); err != nil && !os.IsNotExist(err) {
		panic("failed to load .env")
	}

	e := echo.New()
	e.Debug = true

	// CONNECT TO DATABASE
	connectionString := os.Getenv("MONGO_STRING")
	opts := options.Client().ApplyURI(connectionString)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	address := os.Getenv("SERVER_URL")

	// START ECHO SERVER
	e.Logger.Fatal(e.Start(address))
}
