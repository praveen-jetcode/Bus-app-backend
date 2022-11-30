const mongoose = require("mongoose");

var workersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});


module.exports = mongoose.model("workers", workersSchema);