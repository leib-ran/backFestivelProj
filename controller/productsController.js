const productModel = require("../Models/product");
require("../data/database");

function getSortObj(req) {
  return req.query._order;
}

function getSortName(req) {
  return req.query._sort;
}

function convertOrder(orderType) {
  const order = { desc: -1, asc: 1 };
  return order[orderType];
}

function generateSort(req) {
  const sort = {};
  const name = getSortName(req);
  const orderName = getSortObj(req);
  sort[name] = sort[orderName] = convertOrder(orderName);
  return sort;
}

exports.getAll = (req, res) => {
  let sortBy = {};
  const pattern = /[\w]*/;
  const subcategoryId = req.query["subcategoryId"] || pattern;
  const categoryId = req.query["categoryId"] || pattern;
  if (getSortName(req)) {
    sortBy = generateSort(req);
  }

  productModel
    .find(
      {
        categoryId,
        subcategoryId,
      },
      function (err, products) {
        err ? res.status(500) : res.status(200).send(products);
      }
    )
    .sort(sortBy)
    .skip(9 * Number(req.query["_page"] - 1) || 0)
    .limit(9);
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
      err ? res.status(500).send(err) : res.send(updateProduct);
    }
  );
};

exports.deleteOne = (req, res) => {
  productModel.findOneAndDelete({ id: req.params.id }, (err) => {
    err ? err.send(err) : res.status(200).send({});
  });
};
