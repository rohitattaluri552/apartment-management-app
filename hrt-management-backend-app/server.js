const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URL = "mongodb://localhost:27017/auth-demo";

function connectToMongo() {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("connected to Mongodb successfully");
    })
    .catch((err) => {
      console.error(err);
    });
}

async function closeDbConnection() {
  try {
    await mongoose.disconnect();
    console.log("Database connection closed successfully");
    process.exit(0); // Exit the process after closing the connection
  } catch (err) {
    console.error("Error closing database connection:", err);
    process.exit(1); // Exit with an error code
  }
}

process.on("SIGINT", closeDbConnection);
process.on("SIGTERM", closeDbConnection);

module.exports = { connectToMongo, closeDbConnection };
