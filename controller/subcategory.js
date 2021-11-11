const subCategory = require("../Models/subCategory");

exports.getAllSubCategories = (req, res) => {
  const pattern = /[\w]*/;
  const categoryid = req.query.categoryid || pattern;
  subCategory.find({ categoryid }, function (err, subcategories) {
    err ? res.status(500) : res.status(200).send(subcategories);
  });
};
