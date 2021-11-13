const jwt = require("jsonwebtoken");
const dotenve = require("dotenv");
dotenve.config();

const generateToken = (userName) => {
  return jwt.sign(
    { userName: userName + "njk" },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
    (err, token) => {}
  );
};

module.exports = generateToken;
