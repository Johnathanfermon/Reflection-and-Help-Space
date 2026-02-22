const answerModel = require("../models/answerModel");

// Create a new answer
exports.createAnswer = (req, res) => {
    const { questionId, answerText, anonymous } = req.body;

    if (!answerText || answerText.length < 5) {
        return res.status(400).send("Answer too short");
    }

    answerModel.insertAnswer(questionId, answerText, anonymous, (err) => {
        if (err) return res.status(500).send(err);
        res.send("Answer stored");
    });
};

// Get all answers for a question
exports.getAnswers = (req, res) => {
    const questionId = req.params.questionId;

    answerModel.getAnswers(questionId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};
