const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const Canteen = require("../models/Canteen");
const { body, validationResult } = require("express-validator");
const canteenAuth = require("../middleware/canteenAuth");
const Fooditem = require("../models/Item");
const dotenv = require("dotenv");
dotenv.config();

const {
  register,
  login,
  updateProfile,
  canteenDetails,
  canteenOrders,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/canteenController");

router.post(
  "/register",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("address", "Enter proper address").isLength({ min: 5 }),
    body("phoneNumber", "Phone number must be 10 digits").isLength({ max: 10 }),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
    body("email", "Enter a valid email.").isEmail(),
  ],
  register
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password should be atleast 8 characters.").exists(),
  ],
  login
);

router.put("/profile", canteenAuth, updateProfile);

router.get("/canteens/:id", canteenDetails);

router.get("/canteenOrders", canteenOrders);

router.post("/item", canteenAuth, addItem);

router.put("/item/:id", updateItem);

router.delete("/item/:id", canteenAuth, deleteItem);

module.exports = router;
