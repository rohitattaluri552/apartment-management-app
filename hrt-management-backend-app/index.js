const express = require("express");
const app = express();
const PORT = 3000;
const complaintsRouter = require("./api/complaints");
const authRouter = require("./api/auth");
const cors = require("cors");
const multer = require("multer");
const { json } = require("body-parser");
const { connectToMongo } = require("./server");

// Middleware to parse JSON bodies
app.use(json());

// Middleware to enable CORS
const corsOptions = {
  origin: "*", // Allow only this domain
  methods: "GET,POST,PUT,DELETE", // Allow only specific HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow specific headers
};

app.use(cors(corsOptions));

app.use("/api/complaints", complaintsRouter);
app.use(authRouter);

// Connect to MongoDB and start the server
function connectToMongoDb() {
  try {
    connectToMongo();
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

// Call the function to connect to MongoDB
connectToMongoDb();

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
