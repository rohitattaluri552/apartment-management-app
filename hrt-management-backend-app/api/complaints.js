const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const complaintsRouter = express.Router();

// Define Schema and Model
const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  files: { type: String, required: false },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

// Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

complaintsRouter.get("/admin", function (req, res, next) {
  console.log("Admin Router Working");
  res.end();
});

// API Endpoint to Register Complaints
complaintsRouter.post("/", upload.single("files"), async (req, res) => {
  try {
    const complaint = new Complaint({
      name: req.body.name,
      description: req.body.description,
      files: req.file ?? null,
    });
  } catch (error) {
    res
      .status(401)
      .send({ error: error.message, message: "Invalid request object" });
  }

  try {
    await complaint.save();
    res.status(201).send(complaint);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = complaintsRouter;
