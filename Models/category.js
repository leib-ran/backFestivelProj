const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema({
  title: String,
  id: String,
  icon: String,
  image: String,
});

module.exports = mongoose.model("categories", category);
