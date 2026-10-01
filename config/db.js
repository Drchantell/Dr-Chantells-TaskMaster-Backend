const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed.");
    console.error("Reason:", error.message);
    console.error(
      "Check your MongoDB Atlas Network Access, database username/password, and MONGO_URI."
    );
    process.exit(1);
  }
};

module.exports = connectDB;
