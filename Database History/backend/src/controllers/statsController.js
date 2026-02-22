const db = require("../config/db");

// GET /api/stats
exports.getStats = (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalQuestions, 
           MIN(created_at) AS firstQuestion,
           MAX(created_at) AS lastQuestion
    FROM questions
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results[0]);
  });
};
