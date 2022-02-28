const { json } = require("body-parser");
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

exports.getAll = async (req, res) => {
  try {
    let sortBy = {};
    const pattern = /[\w]*/;
    const subcategoryId = req.query["subcategoryId"] || pattern;
    const categoryId = req.query["categoryId"] || pattern;
    const searchWord = req.query["q"]
      ? new RegExp(`.*${req.query["q"]}.*`, "gi")
      : pattern;
    if (getSortName(req)) {
      sortBy = generateSort(req);
    }
    const totalNumberProducts = await productModel
      .find({
        categoryId,
        subcategoryId,
        title: searchWord,
      })
      .count();
    console.log(2);
    const products = await productModel
      .find({
        categoryId,
        subcategoryId,
        title: searchWord,
      })
      .sort(sortBy)
      .skip(12 * Number(req.query["_page"] - 1) || 0)
      .limit(12);
    console.log(searchWord);
    console.log(3);
    res.status(200).json({ products, totalPages: totalNumberProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ id: req.params.id })
      .select("");

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send("error");
  }
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
