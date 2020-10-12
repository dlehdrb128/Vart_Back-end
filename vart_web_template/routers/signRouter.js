const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const passport = require('passport')






//회원가입 조회
router.get("/join/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  res.send("sign");
});
//로그인 조회
router.get("/login", function (req, res) {
  var query = {
    name: req.body.name,
    email: req.body.email
  }
  User.findOne(query, function (err, user) {
    if (!user) {
      res.status(500).send("아이디 혹은 이메일 오류");
    } else {

      // 
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          res.status(200).send("Login is Success");
        } else {
          res.status(500).send("Password Error");
        }
      })
    }
  })
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

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/'
}), (req, res) => {
  // user check 
  console.log(req.user)
  // session
  // token을 client에 response.
  // - cookie or resp.body에 담아줄건지. 결정
  res.redirect('/');
});


module.exports = router;
