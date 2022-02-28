const productsControler = require("../controller/productsController");

const express = require("express");
const router = express.Router();

router.route("/").get(productsControler.getAll).post(productsControler.postOne);

router.get("/:id", productsControler.getOne);
router.put("/:id", productsControler.changeOne);
router.delete("/:id", productsControler.deleteOne);

module.exports = router;
