//AWS-S3-test.js
//The MIT License (MIT)
require('dotenv').config() // reading variables from .env
const AWS = require('aws-sdk')
const fs = require('fs')

//reading variables from .env
const config = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.S3_ENDPOINT // it could be any S3 provider
}

const s3 = new AWS.S3(config)

console.log(config)
//file to upload
const fileContent = fs.readFileSync('test.jpg')

//Setting up S3 upload parameters
const params = {
  // Bucket: 'media-service-storage',
  Bucket: 'media-storage-bucket12',
  // Key: 'ff.jpg', // File name you want to save as in S3
  Key: 'test.jpg', // File name you want to save as in S3
  Body: fileContent
}

// Uploading files to the bucket
s3.upload(params, function (err, data) {
  if (err) {
    throw err
  }
  console.log(`File uploaded successfully. ${data.Location}`)
});

// list of buckets
s3.listBuckets(function (err, data) {
  if (err) {
    throw err
  }
  console.log(data)
})
