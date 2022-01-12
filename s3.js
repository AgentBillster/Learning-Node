require("dotenv").config();
const s3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const key = process.env.AWS_ACCESS_KEY;
const secret = process.env.AWS_SECRET_KEY;

const u = new s3({
  region,
  key,
  secret,
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    key: file.filename,
  };
  return u.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;
