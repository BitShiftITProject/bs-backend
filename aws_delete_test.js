require('dotenv').config()
const AWS = require('aws-sdk')

const config = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.S3_ENDPOINT
}
const s3 = new AWS.S3(config)
const bucket = "media-storage-bucket12"

const params = {
  Bucket: bucket,
  Key: "5f8b9e1697ca52447c558570"
}

s3.deleteObject(params, function (err, data) {
  if (err) {
    console.log("error");
  }
  else {
    console.log("success", data);
  };
})
