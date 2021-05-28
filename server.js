/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ___Anas Zakariyah Bemat______ Student ID: __165239187___ Date: ___2021-05-27_____
* Heroku Link: http://fast-sea-51497.herokuapp.com
*
********************************************************************************/ 

// ------------------------------------------------------------------
// Web service setup
// ------------------------------------------------------------------

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

// Database
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB("mongodb+srv://dbazbemat:Anas2020@web422.b6oog.mongodb.net/sample_restaurants?retryWrites=true&w=majority");

// Add support for incoming JSON entities
app.use(bodyParser.json());

// Add support for CORS
app.use(cors());

// ------------------------------------------------------------------
// Request handlers for data entities (listeners)
// ------------------------------------------------------------------

// to ensure server is running
app.get("/", (req, res)=>{
    res.json({message: "API Listening"});
})

//POST /api/restaurants
app.post("/api/restaurants", (req, res) =>{

    db.addNewRestaurant(req.body)
    .then((restaurants) => {
        res.status(201).json({message: `${restaurants}`});
    })
    .catch((err) => {
        res.status(404).json(err);
    });

});


//GET /api/restaurants  ---  parameters "page" and "perPage" must present --- ie: /api/restaurants?page=1&perPage=5&borough=Bronx.
app.get("/api/restaurants", (req, res) =>{

    db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((restaurants) => {
        res.status(200).json(restaurants);
    })
    .catch((err) => {
        res.status(404).json({message: `${err}`});
    });

});


//GET /api/restaurants
app.get("/api/restaurants/:id", (req, res) =>{

    db.getRestaurantById(req.params.id)
    .then((restaurants) => {
        res.status(200).json(restaurants);
    })
    .catch((err) => {
        res.status(404).json({ "message": "Resource Not Found - ERROR - " + `${err}`});
    });

});


//PUT /api/restaurants
app.put("/api/restaurants/:id", (req, res) =>{

    db.updateRestaurantById(req.body, req.params.id)
    .then(restaurants => {
        if(!restaurants){
            res.status(404).json({ "message": "Resource not found" })
        }      
        res.status(200).json({message: `${restaurants}`});       
    })
    .catch((err) => {
        res.status(500).json({ "message": `ERROR - ${err}`});
    });

});


//DELETE /api/restaurants
app.delete("/api/restaurants/:id", (req, res) =>{

    db.deleteRestaurantById(req.params.id)
    .then((restaurants) => {
        res.status(201).json({message: `${restaurants}`});
    })
    .catch((err) => {
        res.status(404).json({"message": "Resource Not Found - ERROR - " + `${err}`});
    });

});


// ------------------------------------------------------------------
// Tell the app to start listening for requests
// ------------------------------------------------------------------


// to ensure DB is connected
db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});
   

