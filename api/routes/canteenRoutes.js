const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const canteenAuth = require("../middleware/canteenAuth");
const dotenv = require("dotenv");
dotenv.config();

const {
  register,
  login,
  updateCanteenProfile,
  canteenDetails,
  canteenOrders,
  addItem,
  updateItem,
  deleteItem,
  getCanteenAuth,
  submitFeedback,
  getAnalytics,
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

router.get("/getDetails", canteenAuth, getCanteenAuth);

router.put(
  "/profile",
  canteenAuth,
  [
    body("name", "Enter a valid name!").isLength({ min: 3 }),
    body("phoneNumber", "Not a valid phone number.").isLength({ max: 10 }),
    body("address", "Enter a valid address.").isLength({ max: 20 }),
  ],
  updateCanteenProfile
);

router.get("/canteens/:id", canteenDetails);

router.get("/canteenOrders", canteenOrders);

router.get("/getAnalytics/:id", getAnalytics);

router.post("/item", addItem);

router.put("/item/:id", updateItem);

router.delete("/item/:id", canteenAuth, deleteItem);

router.post("/feedback", submitFeedback);

module.exports = router;
