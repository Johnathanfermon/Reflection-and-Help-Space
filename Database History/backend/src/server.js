require("dotenv").config();
const app = require("./app");
const db = require('./config/db'); // ✅ correct path
 // Make sure you have db.js exporting MySQL pool

// ---------------- Routes ----------------
// Existing /api/stats route should already be here
// Add the questions route
app.get('/api/questions', (req, res) => {
  const query = `
    SELECT q_id, question_text, category, emotional_value, created_at
    FROM questions
    ORDER BY created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // send all questions as JSON
  });
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Stats API server running on port ${PORT}`);
});


// ---------------- Base Url Accessed ----------------

app.get("/", (req, res) => {
  res.send("API is running");
});


app.post('/api/questions', (req, res) => {
  const { question_text, category, emotional_value } = req.body;

  if (!question_text) {
    return res.status(400).json({ error: "Question text is required" });
  }

  const query = `
    INSERT INTO questions (question_text, category, emotional_value)
    VALUES (?, ?, ?)
  `;

  db.query(
    query,
    [question_text, category, emotional_value],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: "Question added successfully",
        id: result.insertId
      });
    }
  );
});

