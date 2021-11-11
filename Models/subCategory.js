const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  id: String,
  categoryid: String,
  name: String,
  icon: String,
});

module.exports = mongoose.model("subcategory", subcategorySchema);
