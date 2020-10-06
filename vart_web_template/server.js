const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const connect = require("./schemas");
const apiRouter = require("./routers/apiRouter");

const app = express();
dotenv.config();

app.set("port", process.env.PORT || 3001);

app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", apiRouter);

app.listen(app.get("port"), function () {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
