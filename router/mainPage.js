var express = require("express");
var app = express();

/* GET home page. */
app.get("/", function (req, res, next) {
  res.render("mainPage", { title: "mainPage" });
  // res.render("mainPage", { title: "hello" });
  // console.log(req.user.userId);
});

module.exports = app;
