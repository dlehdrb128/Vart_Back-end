const express = require("express");
const router = express.Router();
const passport = require('passport')
const User = require("../schemas/user");
const authenticate = require('../authenticate')

// 일반유저 회원가입
router.post("/person", (req, res) => {
  const userdata = req.body;
  const user = new User(userdata);

  User.findOne({ email: req.body.email }, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: "회원가입 성공" })
    } else if (result) {
      res.status(200).json({ message: "회원가입 실패" })
    } else {
      user.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error sigup new user please try again");
        } else {
          res.status(200).send("Sign up is Success");
        }
      });
    }
  })
});

// 기업유저 회원가입(권한 필요)
router.post("/company", authenticate.signUp, (req, res) => {
  req.body.permission = "company"

  const userdata = req.body
  const user = new User(userdata);

  user.save((err) => {
    if (err) {
      console.log(err);

      res.status(500).send("Error sigup new user please try again");
    } else {
      res.status(200).send("Sign up is Success");
    }
  });
});

// 로그인
router.post("/login", passport.authenticate('local'), (req, res) => {
  req.login(req.user, (err) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error sigup new user please try again");
    }
    res.json({ message: 'login Success' })
  })
});

// 로그아웃 
router.get("/logout", (req, res) => {
  req.logout()
  res.status(200).json({ message: '로그아웃' })
});

// 유저 찾기 
router.get("/find", authenticate.user, (req, res) => {
  const email = req.user.permission === "admin" ? req.body.email : req.user.email

  User.findOne({ email }, { _id: 0, __v: 0 }, (err, result) => {
    if (err) {
      console.log(err)
      res.json({ message: "Find False" })
    } else if (!result) {
      res.json({ message: "유저가 존재하지 않습니다." })
    } else {
      res.json({ result })
    }
  })
})

// 회원 수정
router.post("/update", authenticate.user, (req, res) => {
  const email = req.user.permission === "admin" ? req.body.email : req.user.email

  User.updateOne({ email }, { $set: req.body }, (err, result) => {
    if (err) {
      console.log(err)
      res.json({ error: '서버 에러' })
    } else if (!result.n) {
      res.json({ message: '유저가 없다' })
    } else {
      res.json({ message: '업데이트 성공' })
    }
  })
})

// 회원 탈퇴
router.post("/withdrawal", authenticate.user, (req, res) => {
  const email = req.user.permission === "admin" ? req.body.email : req.user.email

  User.deleteOne({ email }, (err) => {
    if (err) {
      console.log(err)
      res.json({ error: "서버에러" })
    }

    req.logout()
    res.json({ message: "삭제 성공" })
  })
})

module.exports = router;
