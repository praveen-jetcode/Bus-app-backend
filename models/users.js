var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
//   address:{
//     type:String,
//     require:true
//   },
//   pincode:{
//       type:Number,

//   },
//   phoneNo: {
//     type: String,
//   },
//   companyId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Company",
//   },
  userType: {
    type: Number,
    default: 2,
  },
//   otp: {
//     type: String,
//   },
//   isVerified: {
//     type: String,
//     default: false,
//   },
});

module.exports = mongoose.model("user", userSchema);
