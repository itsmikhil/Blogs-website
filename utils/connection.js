const mongoose = require("mongoose");

let connectionFunction = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/blogWebsite")
    .then(() => console.log("Connected!"));
};

module.exports=connectionFunction;