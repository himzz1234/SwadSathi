const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Canteen = require("../models/Canteen");
const { body, validationResult } = require("express-validator");
const Item = require("../models/Item");
const dotenv = require("dotenv");
const generateToken = require("../utils/generateToken");
const cloudinary = require("cloudinary").v2;

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

    // const data = {
    //   admin: {
    //     id: admin.id,
    //   },
    // };

    const authtoken = generateToken(admin._id);
    success = true;
    res.json({ success, authtoken, isCanteen: admin.isCanteen });
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
    let admin = await Canteen.findOne({ email });
    const passwordCompare = await bcrypt.compare(password, admin.password);
    if (admin && passwordCompare) {
      const authtoken = generateToken(admin._id);
      success = true;
      res.json({
        success,
        authtoken,
        id: admin._id,
        isCanteen: admin.isCanteen,
        name: admin.name,
        email: admin.email,
        menu: admin.menu,
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
const updateProfile = async (req, res) => {
  const canteenId = req.admin.admin.id;
  try {
    const canteen = await Canteen.findById(canteenId);
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${canteenId}_profile`,
        width: 500,
        height: 500,
        crop: "fill",
      });
    }
    if (canteen) {
      (canteen.name = req.body.name),
        (canteen.profilePicture = result.url),
        (canteen.address = req.body.address),
        (canteen.isOpen = req.body.isOpen),
        (canteen.phoneNumber = req.body.phoneNumber),
        (canteen.description = req.body.description);
      const updatedProfile = await canteen.save();
      res.status(200).json({
        message: "Profile updated successfully!",
        name: updatedProfile.name,
        address: updatedProfile.address,
        isOpen: updatedProfile.isOpen,
        description: updatedProfile.description,
        phoneNumber: updatedProfile.phoneNumber,
      });
    } else {
      res.status(404).json({ message: "Profile not found!" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error!" });
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
        select: ["name", "image", "price", "isAvailable", "canteenId"],
      })
      .exec();
    //const canteen = await Canteen.findById(id).select()
    res.send(canteen);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
};

// @desc Get Canteen Orders
// @route GET canteen/orders
const canteenOrders = async (req, res) => {};

// @desc Add Item
// @route POST canteen/item
const addItem = async (req, res) => {
  try {
    const canteenId = req.admin.admin.id;
    const { name, image, price, isAvailable } = req.body;
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
      menu: mycanteen.menu,
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
    const item = await Item.findById(itemId);
    if (item) {
      (item.name = req.body.name),
        (item.image = req.body.image),
        (item.price = req.body.price),
        (item.isAvailable = req.body.isAvailable);
      const updatedItem = await item.save();
      res
        .status(200)
        .json({ message: "Item updated successfully!", updatedItem });
    } else {
      res.status(404).json({ error: "Item not found!" });
    }
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
      const canteen = await Canteen.findById(req.admin.admin.id);
      canteen.menu.pop(item._id);
      await canteen.save();
      await Item.findByIdAndDelete(item);

      return res.status(200).json({ message: "Item removed successfully!" });
    } else {
      return res.status(404).json({ error: "Item not found!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  register,
  login,
  updateProfile,
  canteenDetails,
  canteenOrders,
  addItem,
  updateItem,
  deleteItem,
};
