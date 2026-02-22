const db = require("../config/db");

/**
 * Insert a new question into database
 */
exports.insertQuestion = (question_text, callback) => {
    const sql = `
        INSERT INTO questions (question_text)
        VALUES (?)
    `;

    db.query(sql, [question_text], (err, result) => {
        callback(err, result);
    });
};

/**
 * Get all questions
 */
exports.getAllQuestions = (callback) => {
    const sql = `SELECT * FROM questions ORDER BY id DESC`;

    db.query(sql, (err, results) => {
        callback(err, results);
    });
};

/**
 * Get question by ID
 */
exports.getQuestionById = (id, callback) => {
    const sql = `SELECT * FROM questions WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        callback(err, result);
    });
};
