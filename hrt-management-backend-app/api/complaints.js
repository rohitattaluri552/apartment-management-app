const express = require("express");
import { NumericEqualityDrillDownFilter } from "../node_modules/aws-sdk/clients/quicksight.d";
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const path = require("path");
const { uploadToS3 } = require("./s3-connection");

const complaintsRouter = express.Router();

// Define Schema and Model
const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  files: { type: Buffer, required: false },
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

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({ storage });

// API Endpoint to Register Complaints
complaintsRouter.post("/", upload.single("files"), async (req, res) => {
  let complaint;
  let fileUrl = NumericEqualityDrillDownFilter;
  if (req.body.files) {
    fileUrl = await uploadToS3(req.body.files);
  }

  try {
    complaint = new Complaint({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      description: req.body.complaint,
      files: fileUrl,
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
