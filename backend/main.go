package main

import (
	"context"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/sweeper/routes"
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
	
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:8000", "http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.PATCH, echo.DELETE},
	}))

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

	// REGISTER ROUTES
	routes.ScoreRoutes(e, client)

	// START ECHO SERVER
	e.Logger.Fatal(e.Start(address))
}
