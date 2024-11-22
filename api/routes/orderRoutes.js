//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
//const User = require("../models/User");
//const Canteen = require("../models/Canteen");
const { body, validationResult } = require("express-validator");
const userAuth = require("../middleware/userAuth");
const dotenv = require("dotenv");
dotenv.config();

const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getCanteenOrders,
  updateOrderDetails,
  orderPayment,
} = require("../controllers/orderController.js");

router.post("/order", userAuth, createOrder);
router.get("/order/:id", getOrderById);
router.put("/order/:id", updateOrderDetails);
router.put("/order/:id/pay", updateOrderToPaid);
router.put("/order/:id/delivered", updateOrderToDelivered);
router.get("/myorders", userAuth, getMyOrders);
router.get("/canteenOrders/:id", getCanteenOrders);
router.post("/payment-sheet", orderPayment);

module.exports = router;
