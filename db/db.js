var mongoose = require("mongoose");
//mongodb://bandeira:bandeira94@ds233218.mlab.com:33218/heroku_wcdkwn6c
//mongodb://localhost:27017/banco00
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://bandeira:bandeira94@ds233218.mlab.com:33218/heroku_wcdkwn6c"
);

var userSchema = new mongoose.Schema(
  {
    nome: String,
    email: String,
  },
  { collection: "usuarios" }
);

module.exports = { Mongoose: mongoose, UserSchema: userSchema };
