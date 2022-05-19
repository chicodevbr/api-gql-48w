const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  picture: String,
});

module.exports = mongoose.model('User', UserSchema);
