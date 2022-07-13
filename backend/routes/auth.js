const express = require("express");
//Express.Router is used to forward Request To new Address
const router = express.Router();
//Importing User Model to pass schema
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
///bcrypt
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

////
const JWT_SECRET = "RecklessPRO";

//Create A User Using POST Method. Which Doesn't Require Auth
//Link Changed To "api/auth/createuser"
///Route 1
router.post(
  "/createuser",
  [
    body("email", "Invalid Email").isEmail(),
    body("name", "Name Length Must Be More Than 3 Characters").isLength({
      min: 3,
    }),
    body("password", "Passowrd Must Be Atleast 5 Characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //IF there are errors, return BAD Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success, errors: errors.array() });
    }
    /// Validate Data
    try {
      //Check If User Already Exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: success, error: "Email Already Exists" });
      }
      ///bcrypt>>>
      let salt = await bcrypt.genSalt(10);

      let secPass = await bcrypt.hash(req.body.password, salt);

      //bcrypt END<<<<
      //If User Doesn't Exists Then Create New User
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      let data = {
        user: {
          id: user.id,
        },
      };
      let authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success: success, authToken });
      //res.json({ Success: "User Created Successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route 2: Authenticate User Using JWT,bcrypt,AuthToken

router.post(
  "/login",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Passwrod Empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    //IF there are errors, return BAD Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ success: success, error: "Auth Failed" });
      }
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success: success, error: "Auth Failed!!" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      let authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Occured");
    }
  }
);

//Route 3: LogedInUser Details Using Post Method. Login Required!! [getuser]
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    let user = await User.findById(userId).select("-password ");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Occured");
  }
});

module.exports = router;
