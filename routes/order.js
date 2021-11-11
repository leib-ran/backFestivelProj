var express = require("express");
const router = express.Router();
const orderSchema = require("../Models/validation/orders");
const orderController = require("../controller/orderController");
var validator = require("express-joi-validation").createValidator({
  passError: true,
});

const joiErrors = function (err, req, res, next) {
  if (err && err.error && err.error.isJoi) {
    // console.log(err.error)
    const errors = [];

    err.error.details.forEach((err) => {
      console.log(err);
      const error = {};
      error.field = err.message.split('"')[1];
      error.message = err.message.split('" ')[1];
      errors.push(error);
    });

    // we had a joi error, let's return a custom 400 json response
    res.status(400).json(errors);
  } else {
    // pass on to another error handler
    next(err);
  }
};

router.get("/", orderController.getOrder);

router.post(
  "/",
  validator.body(orderSchema),
  joiErrors,
  orderController.oneOrder
);

module.exports = router;
