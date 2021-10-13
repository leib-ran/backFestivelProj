const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const festivalSchema = new Schema({
  id: Number,
  date: String,
  title: String,
  position: Array,
  price: String,
  country: String,
  ticketPrice: String,
  Days: Number,
  description: String,
  logo: String,
  gallery: Array,
});

module.exports = mongoose.model("festivals", festivalSchema);
