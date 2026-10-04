require("dotenv").config();

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];

const missingEnvVars = requiredEnvVars.filter(
  (name) => !process.env[name] || !process.env[name].trim()
);

if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variable(s): ${missingEnvVars.join(", ")}`
  );
  process.exit(1);
}

const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/api/userRoutes");
const projectRoutes = require("./routes/api/projectRoutes");
const taskRoutes = require("./routes/api/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "TaskMaster API is running!" });
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();