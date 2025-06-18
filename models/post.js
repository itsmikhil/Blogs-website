const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  content: String,
});

let post = mongoose.model("post", postSchema);

module.exports = post;
