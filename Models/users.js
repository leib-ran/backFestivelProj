const { bool, boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  id: Number,
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
  roleId: Number,
  userName: String,
  firstName: String,
  country: String,
  gendre: String,
  lastName: String,
  gender: String,
  phoneNumber: Number,
  userImage: String,
  userEmail: String,
  isFilledDetailsFirst: Boolean,
});
usersSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
module.exports = mongoose.model("users", usersSchema);
