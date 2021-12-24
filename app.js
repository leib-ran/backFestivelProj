var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/products");
var orderRouter = require("./routes/order");
var roleRouter = require("./routes/roles");
var festivalRouter = require("./routes/festival");
var categoryRouter = require("./routes/category");
var subCategoryRouter = require("./routes/subcategory");
var cookieParser = require("cookie-parser");
var helmet = require("helmet");
var app = express();
var compress = require("compression");
var bodyParser = require("body-parser");
require("../back-end-Ecommerce/data/database");

app.use(helmet.contentSecurityPolicy());
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-Range", "bytes: 0-9/*");
  next();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/categories", categoryRouter);
app.use("/festivals", festivalRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/order", orderRouter);
app.use("/subcategories", subCategoryRouter);
app.use("/roles", roleRouter);
~(
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  })
);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
