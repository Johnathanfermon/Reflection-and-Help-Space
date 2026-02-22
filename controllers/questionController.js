const db = require("../config/db");

// GET all questions
exports.getAllQuestions = (req, res) => {
  const sql = `
    SELECT q_id, question_text, category, emotional_value, created_at
    FROM questions
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch Questions Error:", err);
      return res.status(500).json({ message: "Failed to fetch questions" });
    }

    res.status(200).json(results);
  });
};

// GET single question by ID
exports.getQuestionById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT q_id, question_text, category, emotional_value, created_at
    FROM questions
    WHERE q_id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Fetch Single Question Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(results[0]);
  });
};

// POST create question
exports.createQuestion = (req, res) => {
  const { question_text, category, emotional_value } = req.body;

  if (!question_text) {
    return res.status(400).json({ message: "Question text is required" });
  }

  const sql = `
    INSERT INTO questions (question_text, category, emotional_value)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [question_text, category || null, emotional_value || null],
    (err, result) => {
      if (err) {
        console.error("Insert Question Error:", err);
        return res.status(500).json({ message: "Failed to create question" });
      }

      res.status(201).json({
        message: "Question created successfully",
        id: result.insertId
      });
    }
  );
};
