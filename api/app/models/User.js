const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  idUser: String
 
});

module.exports = mongoose.model("User", UserSchema);