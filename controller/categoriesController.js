const categoryModal = require("../Models/category");

exports.getAll = async (req, res) => {
  try {
    const categories = await categoryModal.find().select("-_id");
    return res.status(200).send(categories);
  } catch {
    res.status(500).json({
      err: "Not Found any category",
    });
  }
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
