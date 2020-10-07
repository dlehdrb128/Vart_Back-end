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
    bcrypt.genSalt(saltRounds,function(err,salt){
     if(err) return next(err);
     bcrypt.hash(user.password, salt, function(err, hash) {
       if (err) return next(err);
       user.password = hash;
       next();
      });
    })  
  } else {
    next();
  }
});



module.exports = mongoose.model("User", userSchema);
