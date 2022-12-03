const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
