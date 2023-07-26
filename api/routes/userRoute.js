const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const dotenv = require("dotenv");
dotenv.config();

//const JWT_secret = 'akshay@123'

//Creating a user:

router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password should be atleast 8 characters").isLength({
      min: 8,
    }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Email already exists!" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: hashedPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, process.env.JWT_secret);
      success = true;
      res.json({ success, token: authtoken, user: user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured!");
    }
  }
);

// Login:

router.post(
  "/signin",
  [
    body("password", "Password cannot be blank!").exists(),
    body("email", "Enter a valid email.").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(email, password);
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to log in with correct credentials." });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to log in with correct credentials." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, process.env.JWT_secret, {
        expiresIn: "10d",
      });
      success = true;
      res.json({ success, token: authtoken, user: user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured!");
    }
  }
);

//Logged in user details
router.get("/getdetails", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate({ path: "savedCanteens", select: ["name", "workingStatus"] })
      .exec();
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
});

module.exports = router;
// Push scanned canteens into the SavedCanteens array:
router.post("/saveCanteens/:canteenId", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const canteenId = req.params.canteenId;
    const user = await User.findById(userId).select("-password");
    user.savedCanteens.push(canteenId);
    user.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Some error occured!");
  }
});

// const data = {
//     canteenname: 'SRM Goods',
//     canteenId: '56758995'
// }

// const addCanteen = async()
