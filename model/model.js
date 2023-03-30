const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Email: { type: String, required: true,unique:true},
  Password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});


const UserModel = mongoose.model('user',userSchema);


module.exports = {UserModel};