const bcrypt = require("bcrypt");
const Canteen = require("../models/Canteen");
const { body, validationResult } = require("express-validator");
const Item = require("../models/Item");
const Order = require("../models/Order");
const generateToken = require("../utils/generateToken");
const Feedback = require("../models/Feedback");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const moment = require("moment");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// @desc Canteen Login
// @route POST canteen/login
const register = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let admin = await Canteen.findOne({ email: req.body.email });
    if (admin) {
      return res.status(500).json({ success, error: "Email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    admin = await Canteen.create({
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber,
      password: hashedPass,
      email: req.body.email,
    });

    const authtoken = generateToken(admin._id);
    success = true;
    res.json({ success, token: authtoken, auth: admin });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured.");
  }
};

// @desc Login Canteen and get token
// @route POST canteen/login
const login = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let admin = await Canteen.findOne({ email })
      .populate({
        path: "menu",
        select: ["name", "image", "price", "isAvailable", "canteenId"],
      })
      .sort({ createdAt: -1 });

    const passwordCompare = await bcrypt.compare(password, admin.password);
    if (admin && passwordCompare) {
      const authtoken = generateToken(admin._id);
      success = true;
      res.json({
        success,
        auth: admin,
        token: authtoken,
        message: "Logged In successfully!",
      });
    } else {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct credentials.",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
};

// @desc Update canteen profile
// @route PUT canteen/profile
const updateCanteenProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ error: errors.array() });
  }
  const data = req.body;
  try {
    const canteenId = req.admin.id;
    let userdata = await Canteen.findByIdAndUpdate(canteenId, data);
    if (!userdata) {
      return res.status(404).json({ error: "User not found!" });
    }
    return res
      .status(200)
      .json({ message: "Profile updated successfully.", auth: data });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update profile." });
  }
};

// @desc Get Canteen Details by Id(Mostly used by user to fetch canteen details)
// @route GET canteen/:id
const canteenDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const canteen = await Canteen.findById(id)
      .select(["-phoneNumber", "-password", "-email", "-dateCreated"])
      .populate({
        path: "menu",
        select: [
          "name",
          "image",
          "price",
          "isAvailable",
          "canteenId",
          "address",
          "classification",
        ],
      })
      .exec();
    res.status(200).json({ canteen });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
};

const getCanteenAuth = async (req, res) => {
  try {
    const canteenId = req.admin.id;
    const admin = await Canteen.findById(canteenId)
      .select(["-password", "-dateCreated"])
      .populate({
        path: "menu",
        select: ["name", "image", "price", "isAvailable", "canteenId"],
      })
      .exec();

    return res.status(200).json({ auth: admin, role: "Canteen" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
};

// @desc Get Canteen Orders
// @route GET canteen/orders
const canteenOrders = async (req, res) => {};

const fetchTotalOrders = async (req, res) => {
  const totalOrders = await Order.aggregate([
    {
      $match: {
        canteen: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        totalAmount: { $sum: "$totalPrice" },
      },
    },
  ]);

  return totalOrders;
};

const fetchTopOrders = async (req, res) => {
  const topOrders = await Order.aggregate([
    {
      $match: {
        canteen: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $unwind: "$orderItems",
    },
    {
      $group: {
        _id: "$orderItems.product",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $unwind: "$item",
    },
    {
      $sort: { count: -1 },
    },
  ]);

  return topOrders;
};

const fetchDailyOrders = async (req, res) => {
  const dailyOrders = await Order.aggregate([
    {
      $match: {
        canteen: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $project: {
        dayOfOrder: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
      },
    },
    {
      $group: {
        _id: { dayOfOrderDate: "$dayOfOrder" },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  return dailyOrders;
};

const fetchFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.aggregate([
    {
      $match: {
        canteen: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 0,
        canteen: 0,
        updatedAt: 0,
      },
    },
  ]);

  return feedbacks;
};

const getAnalytics = async (req, res) => {
  Promise.all([
    fetchTotalOrders(req, res),
    fetchTopOrders(req, res),
    fetchFeedbacks(req, res),
    fetchDailyOrders(req, res),
  ]).then(([totalOrders, topOrders, feedbacks, dailyOrders]) => {
    res.json({
      totalOrders,
      topOrders,
      feedbacks,
      dailyOrders,
    });
  });
};

// @desc Add Item
// @route POST canteen/item
const addItem = async (req, res) => {
  try {
    //const canteenId = req.admin.id;
    const { name, canteenId, image, price, isAvailable } = req.body;
    newItem = new Item({
      name,
      canteenId,
      image,
      price,
      isAvailable,
    });
    await newItem.save();
    const mycanteen = await Canteen.findById(canteenId);
    mycanteen.menu.push(newItem._id);
    mycanteen.save();
    res.status(200).json({
      message: "Item added successfully!",
      newItem,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
};

// @desc Update Item
// @route PUT canteen/item
const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Item updated successfully!", updatedItem });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc Remove Item
// @route DELETE canteen/item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item) {
      const canteen = await Canteen.findByIdAndDelete(req.admin.id);
      const index = canteen.menu.findIndex((menuItem) => menuItem == item._id);

      console.log(canteen, index);
      // canteen.menu.splice(index, 1);
      // await canteen.save();
      // await Item.findByIdAndDelete(item._id);

      return res.status(200).json({ message: "Item removed successfully!" });
    } else {
      return res.status(404).json({ error: "Item not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const submitFeedback = async (req, res) => {
  try {
    await Feedback.create({ ...req.body });
    return res
      .status(200)
      .json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  updateCanteenProfile,
  canteenDetails,
  getCanteenAuth,
  canteenOrders,
  getAnalytics,
  addItem,
  updateItem,
  deleteItem,
  submitFeedback,
};
