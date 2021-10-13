const categoryModal = require("../Models/category");

exports.getAll = (req, res) => {
  categoryModal.find({}, (err, categories) => {
    err ? res.status(500) : res.status(200).send(categories);
  });
};

exports.getOne = (req, res) => {
  categoryModal.findOne({ id: req.params.id }, (err, category) => {
    err ? res.status(500).send("Error") : res.status(200).send().category;
  });
};

exports.AddOne = (req, res) => {
  const categoryItem = new categoryModal(req.body);
  categoryItem.save().then(() => {
    res.send(categoryItem);
  });
};

exports.updateOne = (req, res) => {
  categoryModal.findByIdAndUpdate(
    { id: req.body },
    { $set: req.body },
    (err, updateCategory) => {
      err
        ? res.status(500).send("Error")
        : res.status(200).send(updateCategory);
    }
  );
};

exports.deleteOne = (req, res) => {
  categoryModal.findOneAndDelete({ id: req.params.id }, (err) => {
    err ? err.send() : res.status(200).send({});
  });
};
