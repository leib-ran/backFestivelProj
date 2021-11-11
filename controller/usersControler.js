const usersModel = require("../Models/users");

exports.getAll = (req, res) => {
  usersModel.find({}, function (err, users) {
    err ? res.status(550) : res.status(200).send(users);
  });
};

exports.getOne = (req, res) => {
  usersModel.findOne({ userEmail: req.params.userEmail }, (err, users) => {
    err ? res.status(500).send("error") : res.status(200).send(users);
  });
};

exports.postOne = async (req, res) => {
  const userObj = new usersModel(req.body);
  usersModel
    .find({ userEmail: userObj.userEmail })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(400).json({
          error: "Mail exists",
        });
      }

      const userItem = new usersModel({
        userEmail: req.body.userEmail,
        firstName: req.body.firstName,
        items: [],
        lastName: "",
        country: "",
        quanItems: 0,
        isFilledDetailsFirst: true,
      });
      userItem.save().then(() => {
        res.status(201).json({
          messeage: "User created",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.login = (req, res) => {
  const user = new usersModel(req.body);
  usersModel
    .findOne({ userEmail: user.userEmail })
    .populate("items.product")
    .exec()
    .then((user) => {
      if (!user) {
        console.log("shuki");
        return res.status(400).json({
          error: "The mail or passward are not correct",
        });
      }
      return res.status(200).json({
        user,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.updateUser = (req, res) => {
  usersModel.findOneAndUpdate(
    { userEmail: req.body.userEmail },
    { $set: req.body },
    (err, updateUser) => {
      err ? res.status(500).send(err) : res.send(updateUser);
    }
  );
};

exports.deleteOne = (req, res) => {
  usersModel.findOneAndDelete({ id: req.params.id }, (err) => {
    err ? err.send(err) : res.status(200).send({});
  });
};

exports.getItemsFromCart = (req, res) => {
  usersModel
    .find({ userEmail: req.body.userEmail })
    .populate("items.product")
    .exec()
    .then((user) => {
      return res.json(user);
    });
};
