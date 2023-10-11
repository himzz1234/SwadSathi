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
  checkout_web,
  checkout_native,
  checkout
} = require("../controllers/orderController.js");

router.post('/order', userAuth, createOrder)

router.get('/order/:id', getOrderById)

router.put('/order/:id/pay', updateOrderToPaid)

router.put('/order/:id/delivered', updateOrderToDelivered)

router.get('/order/myorders',userAuth, getMyOrders)

router.post('/checkout', checkout)

module.exports = router

