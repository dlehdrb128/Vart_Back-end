const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const passport = require('passport')

//유저 회원가입
router.post("/join/person", (req, res) => {
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

//company 회원가입
router.post("/join/company", (req, res) => {
  const userdata = req.body;
  const {name, email, password, businessnum} = userdata

  if (!businessnum){
    res.status(400)
    res.json({
      message: "businessnum field required"
    })
  } else{
    const user = new User({
      ...userdata,
      isActive: false
  });

  user.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error sigup new user please try again");
    } else {
      res.status(200).send("Sign up is Success");
    }
  });
}});


function loginRequired(req, res, next){
  if(req.user){
    next()
  }
  else{
    res.status(401)
    res.json({message:'error'})
  }
}
// router.use(loginRequired)

//마이페이지 유저 찾기 
router.get("/join", loginRequired, (req, res) => {
  // console.log(req.session)
  console.log(req.user)
  res.json({message:'success'})

  // const { userId } = req.params;
  // res.json({message:user})
})
// //로그인 조회
// router.get("/login", function (req, res) {
//   var query = {
//     name: req.body.name,
//     email: req.body.email
//   }
//   User.findOne(query, function (err, user) {
//     if (!user) {
//       res.status(500).send("아이디 혹은 이메일 오류");
//     } else {

//       // 
//       bcrypt.compare(req.body.password, user.password, function (err, result) {
//         if (result) {
//           res.status(200).send("Login is Success");
//         } else {
//           res.status(500).send("Password Error");
//         }
//       })
//     }
//   })
// });
//로그아웃 
router.get("/logout", (req, res) => {
  req.logout()
  res.status(200).json({message: '로그아웃'})
});


router.get('/login', passport.authenticate('local', {
 session:true
}), (req, res) => {
  req.login
  // user check 
  // session
  // token을 client에 response.
  // - cookie or resp.body에 담아줄건지. 결정
  
  
  res.json({
    message:'login Success'
  })
});

router.post('/log',passport.authenticate('local'),(req,res)=>{
  req.login(req.user,(err)=>{
    if(err) {
      res.json({message:'로그인 실패'})
    }
    res.json({message:'로그인 성공'})
  })
})


module.exports = router;
