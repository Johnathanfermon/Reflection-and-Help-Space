// routes/answerRoutes.js
const express = require("express");
const router = express.Router();

// Import the controller
const answerController = require("../controllers/answerController");

// Route to create a new answer
router.post("/", answerController.createAnswer);

// Route to get all answers for a specific question
router.get("/:questionId", answerController.getAnswers);

module.exports = router;
