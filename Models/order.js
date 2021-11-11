const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  firstName: String,
  lastName: String,
  streetName: String,
  houseNumber: Number,
  city: String,
  note: String,
  zipCodeNumber: Number,
  phoneNumber: Number,
});

module.exports = mongoose.model("orders", orderSchema);
