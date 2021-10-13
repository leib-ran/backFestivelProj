const express = require("express");
const router = express.Router();
const orderModel = require("../Models/order");
require("../data/database");

router.get("/", (req, res) => {
  orderModel.find({}, function (err, orders) {
    err ? res.status(500) : res.status(200).send(orders);
  });
});

router.get("/:id", (req, res) => {
  orderModel.findOne({ id: req.params.id }, (err, orders) => {
    err ? res.status(500).send("error") : res.status(200).send(orders);
  });
});

router.post("/", (req, res) => {
  const productItem = new orderModel(req.body);
  productItem.save().then(() => {
    res.send(productItem);
  });
});

router.put("/", (req, res) => {
  orderModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: req.body },
    (err, updateOrder) => {
      err ? req.status(500).send(err) : res.send(updateOrder);
    }
  );
});

router.delete("/:id", (req, res) => {
  orderModel.findOneAndDelete({ id: req.params.id }, (err) => {
    err ? err.send(err) : res.status(200).send({});
  });
});

module.exports = router;
