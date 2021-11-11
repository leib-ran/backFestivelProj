const express = require("express");
const { model, models } = require("mongoose");
const router = express.Router();
const usersModel = require("../Models/users");
const userController = require("../controller/usersControler");
require("../data/database");

router.get("/", userController.getAll);
router.post("/login", userController.login);
router.get("/:id", userController.getOne);
router.post("/", userController.postOne);
router.put("/", userController.updateUser);
router.delete("/:id", userController.deleteOne);
router.post("/cart", userController.getItemsFromCart);
module.exports = router;
