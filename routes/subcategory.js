const subCategory = require("../controller/subcategory");
const express = require("express");
const router = express.Router();

router.get("/", subCategory.getAllSubCategories);

module.exports = router;
