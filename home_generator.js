const fs = require("fs-extra");

function homeGenerator(
  name,
  bio,
  education,
  skills,
  experience,
  achievements,
  contact
) {
  var html = `

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name} Resume</title>
        <link rel="stylesheet" href="./js/jQuery-Plugin-SVG-Progress-Circle/progresscircle.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
            integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
            crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
            integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
            crossorigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="./css/style.css">
        <link rel="stylesheet" type="text/css" href="./css/commons.css">
        <link rel="stylesheet" href="./css/home.css">
        <link rel="stylesheet" href="./css/education.css">
        <link rel="stylesheet" href="./css/achievement.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/v4-shims.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
    </head>

    <body>
        <nav>
            <div class="name">
                <h2>${name}</h2>
            </div>
            <ul class="nav-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#achievement">Achievements</a></li>
                <li><a href="#contact">Contact Me</a></li>
            </ul>
            <div class="square">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
        </nav>
        <section class="home" id="home">
            <div class="home-img">
                <img src="./images/logo.jpg" alt="">
            </div>
            <div class="home-intro">
                <h1>${name}</h1>
                <p>${bio}</p>
            </div>
        </section>
        <div class="home-css-shape"></div>

        <section class="education" id="education">
            <div class="underline">
                <h1>Education</h1>
                <div></div>
            </div>
            <div class="timeline">`;
  education.forEach((i) => {
    html += `
                        <div class="container left">
                        <div class="content">
                            <h2>${i["name"]}</h2>
                            <p class="period">${i["duration"]}</p>
                            <p class="description">${i["description"]}</p>
                        </div>
                    </div>
                    `;
  });
  html += `
            </div>
        </section>

        <section id="skills">
            <div class="container-fluid" id="skill_div">
                <div class="row" style="justify-content: center;">
                    <div class="underline">
                        <h1 class="heading skill_head col-12">Skills</h1>
                        <div></div>
                    </div>
                </div>
                <div class="bar_div row skills-container">
                    <div class="column">
                        ${
                          skills[0] != null
                            ? `<div class="skill" id="talkbubble">
                              ${skills[0]}
                            </div>
                            `
                            : ""
                        }
                        ${
                          skills[3] != null
                            ? `
                            <div class="skill" id="talkbubble">
                              ${skills[3]}
                            </div>
                            `
                            : ""
                        }
                        ${
                          skills[8] != null
                            ? `<div class="skill" id="talkbubble">
                              ${skills[8]}
                            </div>
                            `
                            : ""
                        }
                    </div>
                    <div class="column">
                        ${
                          skills[1] != null
                            ? `<div class="skill" id="talkbubble">
                              ${skills[1]}
                            </div>
                            `
                            : ""
                        }
                        ${
                          skills[4] != null
                            ? `<div class="skill" id="talkbubble">
                              ${skills[4]}
                            </div>`
                            : ""
                        }
                        ${
                          skills[6] != null
                            ? `<div class="skill" id="talkbubble">
                              ${skills[6]}
                            </div>`
                            : ""
                        }
                    </div>
                    <div class="column">
                        ${
                          skills[2] != null
                            ? ` <div class="skill" id="talkbubble">
                              ${skills[2]}
                            </div>`
                            : ""
                        }
                        ${
                          skills[5] != null
                            ? ` <div class="skill" id="talkbubble">
                              ${skills[5]}
                            </div>`
                            : ""
                        }
                        ${
                          skills[7] != null
                            ? `<div class="skill" id="talkbubble">
                              ${skills[7]}
                            </div>`
                            : ""
                        }
                    </div>
                </div>
            </div>
        </section>

        <section class="experience" id="experience">
            <div class="container-fluid exp_section">
                <div class="underline">
                    <h1 class="heading">Experience</h1>
                    <div></div>
                </div>
                <dl>
                `;

  experience.forEach((e, i) => {
    html += `
                            ${
                              i % 2 === 0
                                ? `
                        <dt class="wow FadeInUp">
                            <p class="col-6">
                                <i class="fas fa-quote-left icon"></i>${e["heading"]}
                            </p>
                        </dt>
                        <dt class="wow FadeInUp">
                        <dd class="col-md-6">
                            ${e["duration"]}
                        </dd>
                        </dt>
                        <dd class="col-md-6 wow FadeInUp">${e["description"]}</dd>
                            `
                                : `
                        <dt class="wow FadeInUp row">
                            <p class="offset-md-6">
                                <i class="fas fa-quote-left icon"></i>${e["heading"]}
                            </p>
                        </dt>
                        <dt class="wow FadeInUp">
                        <dd class="offset-md-6 col-md-6">
                            ${e["duration"]}
                        </dd>
                        </dt>
                        <dd class="offset-md-6 col-md-6 wow FadeInUp">${e["description"]}</dd>

                        `
                            }

                        `;
  });

  html += `

                </dl>
            </div>
        </section>
        <section class="achievement" id="achievement">
            <div class="underline">
                <h1>Achievements</h1>
                <div></div>
            </div>
            <div class="col">
            `;

  achievements.forEach((i) => {
    html += `
                        <div class="achievement-card">
                            <h2>${i["name"]}</h2>
                            <h5>${i["date"]}</h5>
                            <p>${i["description"]}</p>
                        </div>
                        `;
  });
  html += `
            </div>
        </section>
        <section class="contact" id="contact">
            <div class="underline">
                <h1 class="heading">Contact</h1>
                <div></div>
            </div>
            <br />
            <p class="subheading">Would love to hear from you !</p>
            <div class="row social">
                ${
                  contact["socials"]["linkedin"] !== null
                    ? `
                    <a href="${contact["socials"]["linkedin"]}"><i class="fab fa-linkedin"></i></a>
                `
                    : ""
                }
                ${
                  contact["socials"]["github"] !== null
                    ? `
                    <a href="${contact["socials"]["github"]}"><i class="fab fa-github"></i></a>
                `
                    : ""
                }
                ${
                  contact["socials"]["twitter"] !== null
                    ? `
                    <a href="${contact["socials"]["twitter"]}"><i class="fab fa-twitter"></i></a>
                `
                    : ""
                }
            </div>
            <div class="info">
                <i class="far fa-envelope">
                    <h5 class="title">${contact["email"]}</h4>
                </i>
                <i class="fas fa-phone icon2">
                    <h5 class="title">${contact["phone"]}</h4>
                </i>
            </div>
        </section>
        <footer>
            <h1 class="subheading">Developed by <a href="https://www.ecellmsit.in/">ECELL MSIT</a> with ♥</h1>
        </footer>

        <script src="./js/home.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js"></script>
        <script>
            new WOW().init();
        </script>
        <script src="./js/jQuery-Plugin-SVG-Progress-Circle/progresscircle.js"></script>
        <script>

            $(function () {
                $('.circlechart').circlechart({})
            });
        </script>
    </body>

    </html>

    `;
  return html;
}

module.exports = homeGenerator;
