package controllers

import (
	"github.com/labstack/echo/v4"
	"github.com/sweeper/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetScores(c echo.Context, client *mongo.Client) error {

	col := client.Database("Minesweeper").Collection("Score")

	stuff, err := col.Find(c.Request().Context(), bson.D{})
	if err != nil {
		return err
	}

	var res []models.ScoreModel
	if err = stuff.All(c.Request().Context(), &res); err != nil {
		return err
	}

	return c.JSON(200, res)
}

func CreateScore(c echo.Context, client *mongo.Client) error {
	type createScoreRequest struct {
		Time int `json:"time"`
		Name string `json:"name"`
		Date string `json:"date"`
	}

	var req createScoreRequest
	if err := c.Bind(&req); err != nil {
		return err
	}

	col := client.Database("Minesweeper").Collection("Score")

	score := models.ScoreModel{
		ID: primitive.NewObjectID(),
	}
	if err := c.Bind(&score); err != nil {
		return err
	}

	_, err := col.InsertOne(c.Request().Context(), score)
	if err != nil {
		return err
	}

	return c.JSON(201, score)
}