package controllers

import (
	"github.com/labstack/echo/v4"
	"github.com/sweeper/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetScores(c echo.Context, client *mongo.Client) error {

	col := client.Database("Minesweeper").Collection("Score")

	stuff, err := col.Find(c.Request().Context(), bson.D{})
	if err != nil {
		panic(err)
	}

	var res []models.ScoreModel
	if err = stuff.All(c.Request().Context(), &res); err != nil {
		panic(err)
	}

	return c.JSON(200, res)
}