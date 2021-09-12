const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("user", userSchema);
