const { render } = require("ejs");
const orderModel = require("../Models/order");

exports.getOrder = function (req, res, next) {
  orderModel.find({}, (err, orders) => {
    return err ? res.status(500).send(err) : res.status(200).send(orders);
  });
};

exports.oneOrder = async function (req, res, next) {
  const order = new orderModel(req.body);
  await order.save();
  // order.json(order);
  res.send("succsess !!");
};
