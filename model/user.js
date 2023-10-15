const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required:[true,"FirstName Required."] },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  password: String,
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
