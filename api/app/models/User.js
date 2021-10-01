const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  pseudo: String
 
});

module.exports = mongoose.model("User", UserSchema);