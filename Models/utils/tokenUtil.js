const jwt = require("jsonwebtoken");
const dotenve = require("dotenv");
dotenve.config();

exports.generateToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

exports.GetToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET).id;
};
