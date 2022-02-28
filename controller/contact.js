const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendMail = (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.passward,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Request Was Sent To Dionysus ",
      text: `${req.body.firstName} ${req.body.lastName} Thank you for contact us`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).send("success");
  } catch (err) {
    res.starus(500).send("error");
  }
};
