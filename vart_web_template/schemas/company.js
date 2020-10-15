const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  //object key ref
  businessnum: {
    type: Number,
    required: true,
    unique: true,
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Company", companySchema);
