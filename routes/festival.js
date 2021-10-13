const festivalController = require("../controller/festivalController");
const express = require("express");
const router = express.Router();

router.get("/", festivalController.getAll);
router.get("/:id", festivalController.getOne);
router.post("/", festivalController.postOne);
router.put("/", festivalController.changeOne);
router.delete("/:id", festivalController.deleteOne);

module.exports = router;
