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

module.exports = { connectToMongo };
