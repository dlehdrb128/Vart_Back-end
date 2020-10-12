const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const saltRounds = 10;


const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
userSchema.pre('save', function (next) {     //save 하기 전에 Schema 
  let user = this
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    })
  } else {
    next();
  }
});


userSchema.methods.comparePassword = function (inputPassword, cb) {
  const isValid = bcrypt.compareSync(inputPassword, this.password);

  if (isValid) {
    cb(null, true);
  } else {
    cb(null, false);
    // cb('error');
  }
};

// console.log(userSchema)

// var query = {
//   name: req.body.name,
//   email: req.body.email
// }
// User.findOne(query, function (err, user) {
//   if (!user) {
//     res.status(500).send("아이디 혹은 이메일 오류");
//   } else {
//     bcrypt.compare(req.body.password, user.password, function (err, result) {
//       if (result) {
//         res.status(200).send("Login is Success");
//       } else {
//         res.status(500).send("Password Error");
//       }
//     })
//   }
// })


module.exports = mongoose.model("User", userSchema);
