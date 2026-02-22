// routes/userRoutes.js
const express = require("express");
const router = express.Router();

// Import the controller
const userController = require("../controllers/userController");

// Register new user
router.post("/register", userController.registerUser);

// Login user
router.post("/login", userController.loginUser);

// Get all users (optional, admin)
router.get("/", userController.getUsers);

module.exports = router;
