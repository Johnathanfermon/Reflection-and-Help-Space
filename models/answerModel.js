const db = require("../config/db");

/**
 * Insert a new answer
 */
exports.insertAnswer = (questionId, answerText, callback) => {
    const sql = `
        INSERT INTO answers (question_id, answer_text)
        VALUES (?, ?)
    `;

    db.query(sql, [questionId, answerText], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

/**
 * Get all answers for a specific question
 */
exports.getAnswersByQuestionId = (questionId, callback) => {
    const sql = `
        SELECT * FROM answers
        WHERE question_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [questionId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};
