const mongoose = require("mongoose");

var busSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  busNo: {
    type: String,
    required: true,
  },
  root: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});


module.exports = mongoose.model("bus", busSchema);
