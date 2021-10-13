const productModel = require("../Models/product");
require("../data/database");

exports.getAll = (req, res) => {
  productModel
    .find({}, function (err, products) {
      err ? res.status(500) : res.status(200).send(products);
    })
    .limit(10);
};

exports.getOne = (req, res) => {
  productModel.findOne({ id: req.params.id }, (err, products) => {
    err ? res.status(500).send("error") : res.status(200).send(products);
  });
};

exports.postOne = (req, res) => {
  const productItem = new productModel(req.body);
  productItem.save().then(() => {
    res.send(productItem);
  });
};

exports.changeOne = (req, res) => {
  productModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: req.body },
    (err, updateProduct) => {
      err ? req.status(500).send(err) : res.send(updateProduct);
    }
  );
};

exports.deleteOne = (req, res) => {
  productModel.findOneAndDelete({ id: req.params.id }, (err) => {
    err ? err.send(err) : res.status(200).send({});
  });
};
