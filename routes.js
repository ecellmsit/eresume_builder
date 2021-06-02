const crypto = require("crypto");
const express = require("express");
const fs = require("fs-extra");
const multer = require("multer");
const homeGenerator = require("./home_generator");
const { zip } = require("zip-a-folder");

const TIMEOUT = 1000 * 60 * 5; // 5 minutes

var upload = multer({ dest: "/tmp/" });
const router = express.Router();

router.get("/", (request, response) => response.send("Hello World!"));

router.get("/getstarted", upload.single("profilePhoto"), (req, res) => {
  // Creates images directory if not existed.
  if (!fs.existsSync("images")) {
    fs.mkdirSync("images");
  }

  // Creating hash using filename & timestamp.
  var hash = crypto
    .createHash("md5")
    .update(req.file.originalname + Date.now().toString())
    .digest("hex");

  var file = __dirname + "/images/" + hash;

  // Save the image by renaming & respond with the hash.
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

router.get("/downloaderesume", express.json(), (req, res) => {
  const {
    name,
    bio,
    education,
    skills,
    experience,
    achievements,
    contact,
    token,
    secureCode,
  } = req.body;

  if (secureCode !== "TheLastProject") {
    res.json({
      status: 401,
      message: "User is not authorized.",
    });
    return;
  }

  if (!fs.existsSync(`images/${token}`)) {
    res.json({
      status: 400,
      message: "Invalid token. User not found.",
    });
    return;
  }

  fs.copy(__dirname + "/template", __dirname + "/" + token, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("success!");

      // Move the image from images directory to eresume directory.
      fs.rename(
        `images/${token}`,
        __dirname + "/" + token + "/images/logo.jpg",
        function (err) {
          if (err) {
            console.error(err);
            return res.status(500).send("Unable to set img");
          }
          try {
            var html = homeGenerator(
              name,
              bio,
              education,
              skills,
              experience,
              achievements,
              contact
            );
            fs.writeFileSync(__dirname + "/" + token + "/index.html", html);

            zip(__dirname + "/" + token, __dirname + "/zip/" + token + ".zip")
              .then(() => {
                setTimeout(() => {
                  fs.unlinkSync(__dirname + "/" + token);
                  fs.unlinkSync(__dirname + "/zip/" + token + ".zip");
                }, TIMEOUT);

                res.json({
                  status: 200,
                  message: "success!",
                  url: "http://" + req.headers["host"] + "/" + token + ".zip",
                });
              })
              .catch((e) => {
                console.error(e);
                return res.status(500).send("Unable to compress files.");
              });
          } catch (e) {
            console.error(e);
            return res.status(500).send("Unable to create html file.");
          }
        }
      );
    }
  });
});

module.exports = router;
