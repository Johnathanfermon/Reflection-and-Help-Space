const express = require("express");
const cors = require("cors");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/stats", statsRoutes);

module.exports = app;
