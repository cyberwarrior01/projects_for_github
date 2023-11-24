// Import necessary modules and userController
const express = require("express");
const {
  registerUser,  // Controller function for user registration
  loginUser,    // Controller function for user login
  currentUser,  // Controller function for fetching current user details
} = require("../Controllers/userController");  // Import userController module
const authMiddleware = require("../Middlewares/authMiddleware ");  // Import authMiddleware module

const router = express.Router();  // Create an Express router

// User registration route
router.route("/register").post(registerUser);

// User login route
router.route("/login").post(loginUser);

// Current user details route
router.route("/current_user").get(authMiddleware, currentUser);

module.exports = router;  // Export the router for use in other parts of the application
