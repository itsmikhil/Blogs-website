const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: String,
  content:String,
});

let post=mongoose.model("post",postSchema);

module.exports=post;