const cartModel = require("../Models/cart");
require("../data/database");

exports.getOne = (req, res) => {
  cartModel
    .find({ userId: req.body.userId })
    .populate("productId")
    .exec()
    .then((cart) => {
      return res.status(200).json({ cart });
    });
};

exports.getOne = (req, res) => {
  cartModel
    .find({ userId: req.body.userId })
    .populate("productId")
    .exec()
    .then((cart) => {
      return res.status(200).json({ cart });
    });
};
