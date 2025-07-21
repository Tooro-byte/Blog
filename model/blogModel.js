const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("blogModel", blogSchema);
