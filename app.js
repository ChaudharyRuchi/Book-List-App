const express = require("express");
const connect = require("./src/Connection/connect");
const RegistrationRouter = require("./src/Routes/Register");

const cors = require("cors");

const port = process.env.Port || 5050;
const app = express();
app.use(cors());

app.use(express.json());
app.use("/", RegistrationRouter);

app.listen(port, () => {
  console.log(`server is on ${port}`);
});
