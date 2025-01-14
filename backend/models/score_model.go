package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ScoreModel struct {
	ID   primitive.ObjectID `json:"id" bson:"_id"`
	Date string             `json:"date" bson:"date"`
	Name string             `json:"name" bson:"name"`
	Time int                `json:"time" bson:"time"`
}
