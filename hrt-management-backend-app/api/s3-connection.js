const express = require("express");
const AWS = require("aws-sdk");

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: "YOUR_AWS_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_AWS_SECRET_ACCESS_KEY",
  region: "YOUR_AWS_REGION",
});

const S3_BUCKET_NAME = "YOUR_S3_BUCKET_NAME";

// Function to upload file to S3
const uploadToS3 = (fileData) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: `complaints/${Date.now()}-${fileData.originalname}`,
      Body: fileData.buffer,
      ACL: "public-read", // Set file permissions (e.g., public-read)
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading to S3:", err);
        reject(err);
      } else {
        console.log("S3 upload success:", data.Location);
        resolve(data.Location);
      }
    });
  });
};

module.exports = { uploadToS3 };
