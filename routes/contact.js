const express = require("express");
const router = express.Router();
const contactController = require("../controller/contact");
const { route } = require("./products");

router.route("/").post(contactController.sendMail);

module.exports = router;
