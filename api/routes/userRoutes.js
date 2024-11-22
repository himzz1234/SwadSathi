const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userAuth = require("../middleware/userAuth");
const dotenv = require("dotenv");
// const generateToken = require("../utils/generateToken");
dotenv.config();

const {
  register,
  login,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  saveCanteenId,
  deleteUser,
  getUserAuth,
  subscribeToCanteen,
} = require("../controllers/userController.js");

router.post(
  "/register",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password should be atleast 8 characters").isLength({
      min: 8,
    }),
    body("email", "Enter a valid email").isEmail(),
  ],
  register
);

router.post(
  "/login",
  [
    body("password", "Password cannot be blank!").exists(),
    body("email", "Enter a valid email.").isEmail(),
  ],
  login
);

router.put(
  "/updateprofile",
  userAuth,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Email should be valid").isEmail(),
  ],
  updateUserProfile
);

router.get("/getDetails", userAuth, getUserAuth);

router.put(
  "/updatepassword",
  userAuth,
  [
    body("newpassword", "Passsword should be atleast 8 characters.").isLength({
      min: 8,
    }),
  ],
  updateUserPassword
);

router.get("/getUsers", getUsers);

router.delete("/deleteUser", userAuth, deleteUser);

router.post("/saveCanteenId/:canteenId", saveCanteenId);

router.put("/subscribeToCanteen/:canteenId", subscribeToCanteen);

module.exports = router;
