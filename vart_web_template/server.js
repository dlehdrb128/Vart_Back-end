const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport")
const session = require('express-session')

const passportConfig = require("./passport")
const connect = require("./schemas");
const apiRouter = require("./routers/apiRouter");

const app = express();
dotenv.config();


app.set('trust proxy', 1)
app.set("port", process.env.PORT || 3001);


connect();


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// passport configuration
app.use(passport.initialize());
app.use(passport.session());


passportConfig()


// app.use(passport.authenticate());
app.use(express.urlencoded({ extended: false }));
app.use("/", apiRouter);

app.listen(app.get("port"), function () {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
