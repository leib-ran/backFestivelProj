const CartController = require("../controller/cartController");
const express = require("express");
const router = express.Router();

router.post("/", CartController.getOne);

module.exports = router;
