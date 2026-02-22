  require("dotenv").config();

  const express = require("express");
  const cors = require("cors");

  const questionRoutes = require("./routes/questionRoutes");
  const answerRoutes = require("./routes/answerRoutes");
  const statsRoutes = require("./routes/statsRoutes");

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Health check route
  app.get("/", (req, res) => {
    res.send("Question & Stats API Server is running");
  });

  // Routes
  app.use("/api/questions", questionRoutes);
  app.use("/api/answers", answerRoutes);
  app.use("/api/stats", statsRoutes);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
