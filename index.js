// Library Imports
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");

// Project Imports
const routes = require("./routes.js");

const PORT = process.env.PORT || 5000;
const app = express();

if (!fs.existsSync("zip")) {
  fs.mkdirSync("zip");
}

app.use(bodyParser.json());

// Routes here
app.use("/api", routes);

// Set static folder
app.use(express.static(__dirname + "/form"));
app.use("/zip", express.static(__dirname + "/zip"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/form/index.html");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
