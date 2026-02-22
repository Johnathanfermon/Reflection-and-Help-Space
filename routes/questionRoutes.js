const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");

// GET all questions → /api/questions
router.get("/", questionController.getAllQuestions);

// GET single question by ID → /api/questions/:id
router.get("/:id", questionController.getQuestionById);

// POST new question → /api/questions
router.post("/", questionController.createQuestion);

module.exports = router;
