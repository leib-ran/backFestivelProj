const festivalModel = require("../Models/festival");

exports.getAll = (req, res) => {
  festivalModel.find({}, (err, festivals) => {
    err ? res.status(500) : res.status(200).send(festivals);
  });
};

exports.getOne = (req, res) => {
  festivalModel.findOne({ id: req.params.id }, (err, festivals) => {
    err ? res.status(500).send("Error") : res.status(200).send(festivals);
  });
};

exports.postOne = (req, res) => {
  const festivalItem = new festivalModel(req.body);
  festivalItem.save().then(() => {
    res.send(festivalItem);
  });
};
exports.changeOne = (req, res) => {
  festivalModel.findOneAndUpdate(
    { id: req.body },
    { $set: req.body },
    (err, updateProduct) => {
      err ? res.status(500).send(err) : res.send(updateProduct);
    }
  );
};

exports.deleteOne = (req, res) => {
  festivalModel.findOneAndDelete({ id: req.params.id }, (err) => {
    err ? err.send(err) : res.status(200).send({});
  });
};
