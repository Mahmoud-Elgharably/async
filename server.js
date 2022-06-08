// My Sources
// https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/9e29ea8c-f587-4e11-9c4a-e2671c23e4e8
// https://classroom.udacity.com/nanodegrees/nd0011-fwd-t2/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/91699e21-0fe8-48cf-a46e-e2b5c8e32fa4

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

/* Express to run server and routes */
const express = require("express");

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
const { send } = require("express/lib/response");
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log("server started");
  console.log(`running on localhost: ${port}`);
}

// GET method route
app.get("/all", function (req, res) {
  res.send(projectData);
});

// POST method route
app.post("/add", function (req, res) {
  projectData = req.body;
  //projectData.push(req.body);
  res.send({ message: "Sent Successfully" });
  //console.log(projectData);
});
