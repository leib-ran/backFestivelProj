const productsControler = require("../controller/productsController");

const express = require("express");
const router = express.Router();

router.get("/", productsControler.getAll);
router.get("/:id", productsControler.getOne);
router.post("/", productsControler.postOne);
router.put("/:id", productsControler.changeOne);
router.delete("/:id", productsControler.deleteOne);

module.exports = router;
