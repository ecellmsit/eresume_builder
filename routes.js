const crypto = require("crypto");
const express = require("express");
const fs = require("fs");
const multer = require("multer");

const TIMEOUT = 1000 * 60 * 5; // 5 minutes

var upload = multer({ dest: "/tmp/" });
const router = express.Router();

router.get("/", (request, response) => response.send("Hello World!"));

router.get("/getstarted", upload.single("profilePhoto"), (req, res) => {
  // Creates images directory if not existed
  if (!fs.existsSync("images")) {
    fs.mkdirSync("images");
  }

  // Creating hash using filename & timestamp
  var hash = crypto
    .createHash("md5")
    .update(req.file.originalname + Date.now().toString())
    .digest("hex");

  var file = __dirname + "/images/" + hash;

  fs.rename(req.file.path, file, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Unable to upload the file.");
    } else {
      res.json({
        message: "File uploaded successfully",
        hash: hash,
      });
    }
  });
});

module.exports = router;
