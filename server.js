// ------------------------------------------------------------------
// Web service setup
// ------------------------------------------------------------------

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Add support for incoming JSON entities
app.use(bodyParser.json());

// Add support for CORS
app.use(cors());

// ------------------------------------------------------------------
// Request handlers for data entities (listeners)
// ------------------------------------------------------------------

app.get("/", (req, res)=>{
    res.json({message: "API Listening"});
})


app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// ------------------------------------------------------------------
// Tell the app to start listening for requests
// ------------------------------------------------------------------

app.listen(HTTP_PORT, onHttpStart);