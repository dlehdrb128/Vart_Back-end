const express = require("express");
const router = express.Router();

//기업 회원가입
router.get("/join", (req, res) => {
  res.send("sign");
});
//기업 로그인
router.get("/login", (req, res) => {
  res.send("sign");
});
//기업 로그아웃
router.get("/logout", (req, res) => {
  res.send("sign");
});

module.exports = router;
