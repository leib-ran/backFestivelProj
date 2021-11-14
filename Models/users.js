const { bool, boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const usersSchema = new Schema({
  id: Number,
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quan: Number,
    },
  ],
  password: String,
  quanItems: Number,
  roleId: Number,
  userName: String,
  firstName: String,
  shippingDetails: Object,
  country: String,
  gendre: String,
  lastName: String,
  gender: String,
  phoneNumber: Number,
  userImage: String,
  userEmail: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  isFilledDetailsFirst: Boolean,
});

usersSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ userEmail: email }).populate(
    "items.product"
  );
  if (!user) {
    throw new Error("cant login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("The password or the email are wrong");
  }
  return user;
};

usersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
usersSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const User = mongoose.model("users", usersSchema);
module.exports = User;
