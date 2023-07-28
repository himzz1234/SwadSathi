const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const Canteen = require("../models/Canteen");
const { body, validationResult } = require("express-validator");
const fetchCanteen = require("../middleware/fetchcanteen");
const Fooditem = require("../models/FoodItem");
const dotenv = require("dotenv");
dotenv.config();

//Register a canteen
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
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let admin = await Canteen.findOne({ email: req.body.email });
      if (admin) {
        return res
          .status(500)
          .json({ success, error: "Email already exists." });
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

      const data = {
        admin: {
          id: admin.id,
        },
      };

      const authtoken = jwt.sign(data, process.env.JWT_secret);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

// canteen admin login:

router.post(
  "/signin",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password should be atleast 8 characters.").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let admin = await Canteen.findOne({ email });
      if (!admin) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }

      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }

      const data = {
        admin: {
          id: admin.id,
        },
      };

      const authtoken = jwt.sign(data, process.env.JWT_secret);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

// get canteen details
router.get("/getcanteendetails/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const canteen = await Canteen.findById(id).select([
      "-phoneNumber",
      "-password",
      "-email",
      "-dateCreated",
    ]);
    res.send(canteen);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
});

//add food items:
router.post("/itemadd", fetchCanteen, async (req, res) => {
  try {
    const canteenId = req.admin.id;
    const { itemName, itemImage, itemPrice, availability } = req.body;
    const newItem = new Fooditem({
      itemName,
      canteenId,
      itemImage,
      itemPrice,
      availability,
    });
    await newItem.save();
    return res.status(200).json({ message: "Item added successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;
