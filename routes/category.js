const CategoryContoroller = require("../controller/categoriesController");
const express = require("express");
const router = express.Router();
require("../data/database");

router.get("/", CategoryContoroller.getAll);
router.get("/:id", CategoryContoroller.getOne);
router.post("/", CategoryContoroller.AddOne);
router.put("/", CategoryContoroller.updateOne);
router.delete("/:id", CategoryContoroller.deleteOne);

module.exports = router;
