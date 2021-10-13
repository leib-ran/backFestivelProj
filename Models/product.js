const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const productSchema = new Scheme({
  id: Number,
  subcategoryId: String,
  categoryId: String,
  icon: String,
  title: String,
  color: String,
  department: String,
  productName: String,
  price: Number,
  productAdjective: String,
  productMaterial: String,
  stokeQuantity: Number,
  productDescription: String,
  companyName: String,
  rank: Number,
  imageUrl: String,
  galleryImages: Array,
});
module.exports = mongoose.model("products", productSchema);
