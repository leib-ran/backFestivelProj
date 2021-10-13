const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id: Number,
  ProductID: Number,
  date: Number,
  Address: String,
  NbItem: Number,
  Total: Number,
  tax: Number,
  status: String,
});

module.exports = mongoose.model("orders", orderSchema);
