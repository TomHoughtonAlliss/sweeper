package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/sweeper/controllers"
	"go.mongodb.org/mongo-driver/mongo"
)

func ScoreRoutes(e *echo.Echo, client *mongo.Client) {
	score := e.Group("/scores")

	score.GET("", func(c echo.Context) error {
        return controllers.GetScores(c, client)
    })

	score.POST("", func(c echo.Context) error {
		return controllers.CreateScore(c, client)
	})

	score.DELETE("", func(c echo.Context) error {
		return controllers.WipeScores(c, client)
	})
}
