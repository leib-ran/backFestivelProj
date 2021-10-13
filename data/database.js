const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(
  `mongodb+srv://ranleib:${process.env.ATLASPASSWARD}@dionysus.fmpx5.mongodb.net/Festival?retryWrites=true&w=majority`
);
