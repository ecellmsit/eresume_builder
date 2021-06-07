const crypto = require("crypto");
const express = require("express");
const fs = require("fs-extra");
const multer = require("multer");
const homeGenerator = require("./home_generator");
const editJsonFile = require("edit-json-file");
const data = require("./data.json");
const { zip } = require("zip-a-folder");
const mv = require("mv");

const TIMEOUT = 1000 * 60 * 15; // 15 minutes

var upload = multer({ dest: "/tmp/" });
const router = express.Router();

router.get("/", (request, response) => response.send("Hello World!"));

router.post("/getstarted", upload.single("profilePhoto"), (req, res) => {
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
  mv(req.file.path, file, function (err) {
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

router.get("/data", (req, response) => {
  if (req.query.code === "theadmin") {
    response.send({
      total: data["count"],
      data: data["users"],
    });
  } else {
    response.status(404).send("Not Found");
  }
});

router.post("/downloaderesume", express.json(), (req, res) => {
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
      try {
        // Move the image from images directory to eresume directory.
        mv(
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
              let file = editJsonFile(`${__dirname}/data.json`);
              fs.writeFileSync(__dirname + "/" + token + "/index.html", html);

              file.set("count", file.get("count") + 1);
              file.append("users", { name, education, contact });

              zip(__dirname + "/" + token, __dirname + "/zip/" + token + ".zip")
                .then(() => {
                  setTimeout(() => {
                    fs.rmdirSync(__dirname + "/" + token, { recursive: true });
                    fs.rmSync(__dirname + "/zip/" + token + ".zip");
                  }, TIMEOUT);

                  res.json({
                    status: 200,
                    message: "success!",
                    url:
                      "http://" +
                      req.headers["host"] +
                      "/zip/" +
                      token +
                      ".zip",
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
      } catch (e) {
        console.error(e);
        return res.status(500).send("unable to rename image.");
      }
    }
  });
});

module.exports = router;
