// Library Imports
const express = require("express");
const bodyParser = require("body-parser");

// Project Imports
const routes = require("./routes.js");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());

// Routes here
app.use("/api", routes);

// Set static folder
app.use(express.static("client"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
