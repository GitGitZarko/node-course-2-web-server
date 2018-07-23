const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
//Creating maintanance page
// app.use((req, res, next) => {
//   res.render("maintanance.hbs", {
//     pageTitle: "Maintanance Page",
//     welcomeMessage: "Dobrodosli na ovu novu stranicu"
//   });
// });
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n");
  next();
});

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  //res.send("<h1>Zdravo Zarko</h1>");
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Dobrodosli na ovu novu stranicu"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    zanimanje: "Jebac",
    skola: "Jebacka"
  });
});

app.listen(3000, () => console.log("Server is up on port 3000."));
