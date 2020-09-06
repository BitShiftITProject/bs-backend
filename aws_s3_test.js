//AWS-S3-test.js
//The MIT License (MIT)
require('dotenv').config() // reading variables from .env
const AWS = require('aws-sdk')
const fs = require('fs')

//reading variables from .env
const config = {
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESSKEYID,
  secretAccessKey: process.env.S3_SECRETACCESSKEY,
  endpoint: process.env.S3_ENDPOINT // it could be any S3 provider
}

const s3 = new AWS.S3(config)

//file to upload
const fileContent = fs.readFileSync('test.jpg')

//Setting up S3 upload parameters
const params = {
  Bucket: 'media-service-storage',
  Key: 'ff.jpg', // File name you want to save as in S3
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
