const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 8800;

app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(
    "",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("db 접속 성공"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mainPageRouter = require("./router/mainPage");

app.use("/", mainPageRouter);

app.listen(port, function () {
  console.log(`server on! http://localhost${port}`);
});
