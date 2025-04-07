const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const apiKey = "YOUR_ZOOM_API_KEY";
const apiSecret = "YOUR_ZOOM_API_SECRET";

const zoomRouter = express.Router();

zoomRouter.get("/zoom", (req, res) => {
  const meetingNumber = req.query.meetingNumber;
  const role = req.query.role;

  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
    "base64"
  );
  const hash = crypto
    .createHmac("sha256", apiSecret)
    .update(msg)
    .digest("base64");
  const signature = Buffer.from(
    `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
  ).toString("base64");

  res.json({ signature });
});

module.exports = zoomRouter;
