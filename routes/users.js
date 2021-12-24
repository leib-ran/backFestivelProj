const express = require("express");
const { model, models } = require("mongoose");
const router = express.Router();
const usersModel = require("../Models/users");
const userController = require("../controller/usersControler");
require("../data/database");

router
  .route("/")
  .get(userController.getAll)
  .post(userController.createUser)
  .put(userController.updateUser);

router
  .route("/user")
  .get(userController.getUser)
  .delete(userController.deleteOne);

router.get("/islogin", userController.isLogin);
router.route("/logout").get(userController.logout);
router.post("/login", userController.login);
router.post("/cart", userController.getItemsFromCart);
module.exports = router;
