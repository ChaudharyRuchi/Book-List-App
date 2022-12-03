const Register = require("../../Model/Register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const { body, validationResult } = require("express-validator");

env.config();

const Login = async (req, res) => {
  try {
    const userPresent = await Register.findOne({ name: req.body.name });
    console.log(userPresent);
    console.log(req.body.password);
    if (userPresent) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        userPresent.password
      );
      console.log(validPassword);
      console.log(userPresent.password);
      if (validPassword) {
        const token = jwt.sign({ userPresent }, process.env.SECRETKEY);
        console.log("Login successfull");
        res.json({
          token: token,
        });
      } else {
        res.status(400).json({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const Registration = async (req, res) => {
  try {
    const userPresent = await Register.findOne({ name: req.body.name });
    if (userPresent) {
      res.status(400).json({
        message: "Username taken",
      });
    }
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    await Register.create({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
      books: req.body.books || [],
    });
    res.status(200).json({
      message: "user registered successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};
const updateBooks = async (req, res) => {
  try {
    const olduser = await Register.findOne({ name: req.body.name });
    //res.status(200).json(olduser);
    await Register.updateOne(
      { _id: olduser._id },
      {
        $set: { books: req.body.books },
      }
    );
    const User = await Register.findOne({ name: req.body.name });
    console.log(User);
    res.status(200).json({
      message: "Books Updated",
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      message: e.message,
    });
  }
};

module.exports = { Login, Registration, updateBooks };
