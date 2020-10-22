var express = require("express");
var cors = require("cors");
var app = express();

const bodyParser = require("body-parser");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/customer.routes.js")(app, cors());

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
