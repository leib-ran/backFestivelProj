const { token } = require("morgan");
const usersModel = require("../Models/users");
const tokenUtil = require("../Models/utils/tokenUtil");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

exports.getAll = (req, res) => {
  usersModel.find({}, function (err, users) {
    err ? res.status(500) : res.status(200).send(users);
  });
};

exports.createUser = (req, res) => {
  const userObj = new usersModel(req.body);
  usersModel
    .find({ userEmail: userObj.userEmail })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.send({
          error: "Mail exists",
        });
      }
      if (req.body.password.length < 6) {
        res.send({
          error: "The password  should be at least 6 charcter",
        });
      }

      const userItem = new usersModel({
        userEmail: req.body.userEmail,
        firstName: req.body.firstName,
        userName: req.body.userName,
        password: req.body.password,
        items: [],
        lastName: "",
        country: "",
        quanItems: 0,
        isFilledDetailsFirst: true,
      });

      userItem
        .save()
        .then(() => {
          res.status(201).json({
            messeage: "User created",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(401).json({
            error: "The userEmail is required",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.login = async (req, res) => {
  try {
    const user = await usersModel.findByCredentials(
      req.body.userEmail,
      req.body.password
    );
    const token = tokenUtil.generateToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, sameSite: "lax", secure: true });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).send("Email or Passward arent correct");
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    console.log("ran");
    res.status(200).json({
      message: "signed out",
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      message: "signed out",
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const id = tokenUtil.GetToken(token);
    const user = await usersModel.findOne({ _id: id }).select("-password -_id");
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ error: "unautharied user" });
  }
};

exports.isLogin = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    const id = tokenUtil.GetToken(token);
    const user = await usersModel.findOne({ _id: id });
    return res.status(200).json({
      isLogin: true,
    });
  } catch {
    console.log(req.cookies.jwt);
    return res.status(401).json({
      isLogin: false,
    });
  }
};

exports.updateUser = (req, res) => {
  console.log(req.body);
  usersModel.findOneAndUpdate(
    { userEmail: req.body.userEmail },
    { $set: req.body },
    (err, updateUser) => {
      console.log(err);
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
