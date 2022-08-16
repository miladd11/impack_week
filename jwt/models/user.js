const mongoose = require("mongoose");

const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, default: null,required: true },
  email: { type: String, unique: true,required: true },
  password: { type: String,required: true, },
  
});
// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


module.exports = mongoose.model("myproject", userSchema);