const express = require("express");
const { model, models } = require("mongoose");
const router = express.Router();
const rolesModel = require("../Models/role");
require("../data/database");

router.get("/", (req, res) => {
  rolesModel.find({}, function (err, roles) {
    err ? res.status(500) : res.status(200).send(roles);
  });
});

router.get("/:id", (req, res) => {
  rolesModel.findOne({ id: req.params.id }, (err, roles) => {
    err ? res.status(500).send("error") : res.status(200).send(roles);
  });
});

router.post("/", (req, res) => {
  const role = new rolesModel(req.body);
  user.save().then(() => {
    res.send(role);
  });
});

router.put("/", (req, res) => {
  rolesModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: req.body },
    (err, updateRole) => {
      err ? req.status(500).send(err) : res.send(updateRole);
    }
  );
});

router.delete("/:id", (req, res) => {
  rolesModel.findOneAndDelete({ id: req.params.id }, (err) => {
    err ? err.send(err) : res.status(200).send({});
  });
});
module.exports = router;
