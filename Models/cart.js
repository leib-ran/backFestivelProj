const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  id: Number,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  quan: Number,
});

module.exports = mongoose.model("cart", cartSchema);
