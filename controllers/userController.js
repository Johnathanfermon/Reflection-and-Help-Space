const userModel = require("../models/userModel");

// Register user
exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send("All fields required");
    }

    userModel.createUser(username, email, password, (err) => {
        if (err) return res.status(500).send(err);
        res.send("User registered");
    });
};

// Login user
exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and password required");
    }

    userModel.loginUser(email, password, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(401).send("Invalid credentials");
        res.json({ message: "Login successful", user });
    });
};

// Get all users (admin use)
exports.getUsers = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) return res.status(500).send(err);
        res.json(users);
    });
};
