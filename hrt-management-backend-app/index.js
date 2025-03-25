const express = require("express");
const app = express();
const PORT = 3000;
const complaintsRouter = require("./api/complaints");
const authRouter = require("./api/auth");
const { json } = require("body-parser");
const cors = require("cors");
const { connectToMongo } = require("./server");

// Middleware to parse JSON bodies
app.use(json());

app.use("api/complaints", complaintsRouter);
app.use(authRouter);

const corsOptions = {
  origin: "*", // Allow only this domain
  methods: "GET,POST,PUT,DELETE", // Allow only specific HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow specific headers
};

app.use(cors(corsOptions));

// Connect to MongoDB and start the server
async function connectToMongoDb() {
  try {
    await connectToMongo();
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

// Start the server
connectToMongoDb();

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
