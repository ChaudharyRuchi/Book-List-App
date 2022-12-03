const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  Login,
  Registration,
  updateBooks,
} = require("./Callback/RegisterCallback");

const router = express.Router();
router.post("/login", Login);

router.post(
  "/register",
  body("email").isEmail(),
  body("name").isAlpha(),
  body("password").isLength({ mins: 6, max: 16 }),
  Registration
);
router.put("/updatebooks", updateBooks);

module.exports = router;
