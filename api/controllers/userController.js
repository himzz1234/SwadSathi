const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
//const express = require("express");
//const router = express.Router();
const Canteen = require("../models/Canteen");
const { body, validationResult } = require("express-validator");
//const fetchuser = require("../middleware/userAuth");
//const FoodItem = require("../models/FoodItem");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    register User & get token
// @route   POST /api/users/register
const register = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, password, email } = req.body;
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ success, error: "Email already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      password: hashedPass,
      email: email,
    });

    const authtoken = generateToken(user._id);
    success = true;
    res.json({
      success,
      auth: user,
      token: authtoken,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured!");
  }
};

// @desc login and get token
// @route POST api/users/login
const login = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (user && passwordCompare) {
      const authtoken = generateToken(user._id);
      success = true;
      user = await user.populate({
        path: "savedCanteens.canteen",
        select: ["name", "isOpen", "address", "profilePicture", "coverPicture"],
      });

      console.log(user);
      res.json({
        success,
        auth: user,
        token: authtoken,
        message: "Logged In successfully!",
      });
    } else {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to log in with correct credentials.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured!");
  }
};

// @desc update User profile(only name & email)
// @route PUT api/users/profile
const updateUserProfile = async (req, res) => {
  const data = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ error: errors.array() });
  }
  try {
    let userId = req.user.id;
    let userdata = await User.findByIdAndUpdate(userId, data);
    if (!userdata) {
      return res.status(404).json({ error: "User not found." });
    }
    return res
      .status(200)
      .json({ message: "Updated successfully!", auth: data });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update profile." });
  }
};

const getUserAuth = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "savedCanteens.canteen",
        select: ["name", "isOpen", "address", "profilePicture", "coverPicture"],
      })
      .exec();

    return res.status(200).json({ auth: user, role: "User" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
};

//@desc update User password
//@route PUT api/user/password
const updateUserPassword = async (req, res) => {
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
};

//@desc get all user(administration)
//@route GET api/users
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// @desc delete User
// @route DELETE api/user/
const deleteUser = async (req, res) => {
  const userId = req.user.admin.id;
  const user = await User.findById(userId);
  if (user) {
    await user.remove();
    return res.json({ message: "User removed!" });
  } else {
    return res.status(404).json({ message: "User not found!" });
  }
};

// @desc save Canteen Id in User
// @route POST api/savecanteenId/:id
const saveCanteenId = async (req, res) => {
  const userId = req.body.userId;
  const canteenId = req.params.canteenId;

  try {
    const user = await User.findById(userId);
    const findcanteen = await Canteen.findById(canteenId)
      .select("-password")
      .populate("menu")
      .exec();

    if (findcanteen && user) {
      if (user.savedCanteens.includes(canteenId)) {
        res.status(200).json({
          message: "This canteen already exists in the [Saved Canteens].",
          canteen: findcanteen,
        });
      } else {
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
    return res.status(500).json(error.message);
  }
};

const subscribeToCanteen = async (req, res) => {
  const userId = req.body.userId;
  const canteenId = req.params.canteenId;
  const isSubscribed = req.body.isSubscribed;

  try {
    const user = await User.findById(userId);

    user.savedCanteens.find(
      (item) => item.canteen.toString() === canteenId
    ).subscribed = isSubscribed;

    user.save();
    res.status(200).json({
      message: "Succesfully Subscribed",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  register,
  login,
  updateUserProfile,
  updateUserPassword,
  getUserAuth,
  getUsers,
  saveCanteenId,
  deleteUser,
  subscribeToCanteen,
};
