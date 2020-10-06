const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

//회원가입 조회
router.get("/join/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  res.send("sign");
});
//로그인 조회
router.get("/login", (req, res) => {
  res.send("login");
});
//로그아웃 조회
router.get("/logout", (req, res) => {
  res.send("logout");
});
//회원가입
router.post("/join", (req, res) => {
  const userdata = req.body;
  const user = new User(userdata);
  console.log(userdata);

  user.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error sigup new user please try again");
    } else {
      res.status(200).send("Sign up is Success");
    }
  });
});

module.exports = router;
