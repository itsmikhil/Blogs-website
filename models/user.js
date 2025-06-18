const mongoose = require("mongoose");
const post = require("./post");

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

let user = mongoose.model("user", userSchema);

module.exports = user;
