const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Canteen = require("../models/Canteen");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const FoodItem = require("../models/FoodItem");
const dotenv = require("dotenv");
dotenv.config();

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
    try {
      let user = await User.findOne({ email })
        .populate({ path: "savedCanteens", select: ["name", "workingStatus"] })
        .exec();
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

//Update Profile
router.put(
  "/updateprofile",
  fetchuser,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Email should be valid").isEmail(),
  ],
  async (req, res) => {
    const newdata = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ error: errors.array() });
    }
    try {
      let userId = req.user.id;
      let userdata = await User.findByIdAndUpdate(userId, newdata);
      if (!userdata) {
        return res.status(404).json({ error: "User not found." });
      }
      return res
        .status(200)
        .json({ message: "Updated successfully!", newdata });
    } catch (error) {
      res.status(500).json({ error: "Failed to update profile." });
    }
  }
);

//Update Password
router.put(
  "/updatepassword",
  fetchuser,
  [
    body("newpassword", "Passsword should be atleast 8 characters.").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ error: errors.array() });
    }
    let success = false;
    const { oldpassword, newpassword } = req.body;
    try {
      let userId = req.user.id;
      const userdata = await User.findById(userId);
      if (oldpassword && newpassword) {
        const passwordCompare = await bcrypt.compare(
          oldpassword,
          userdata.password
        );
        if (!passwordCompare) {
          return res.send("Invalid old password!");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        let newdata = await User.updateOne(
          { _id: userId },
          { $set: { password: hashedPassword } }
        );
        if (!newdata) {
          return res.send("Password could not be updated");
        }
        success = true;
        return res.status(200).json({
          success,
          message: "Password updated successfully!",
          newdata,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
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

//Update recently saved canteens
router.post("/saveCanteens/:canteenId", async (req, res) => {
  console.log(req.params.canteenId);
  try {
    const userId = req.body.userId;
    const canteenId = req.params.canteenId;

    const user = await User.findById(userId);
    const findcanteen = await Canteen.findById(canteenId)
      .select("-password")
      .populate("menu")
      .exec();

    if (findcanteen && user) {
      console.log("mai");
      if (user.savedCanteens.includes(canteenId)) {
        console.log("already");
        res.status(200).json({
          message: "This canteen already exists in the [Saved Canteens].",
          canteen: findcanteen,
        });
      } else {
        console.log("nahi hai");
        user.savedCanteens.push(canteenId);
        user.save();
        res.status(200).json({
          message: "Canteen saved in the profile!",
          canteen: findcanteen,
        });
      }
    } else {
      res.send("Some error occured!");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Some error occured!");
  }
});

module.exports = router;
