const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const AWSs3 = new AWS.S3();

module.exports.uploadFile = async (userId, file) => {
  try {
    if(!file || !userId) {
      throw new Error({
        status: 500,
        message: 'Internal Server error: Invalid file or userId'
      });
    }
    
    const { createReadStream, filename, mimetype, encoding } = file;
    const fileStream = createReadStream();
    const params = {
      ACL: 'public-read',
      Body: fileStream,
      Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
      Key: `${userId}-${Date.now()}-${filename}`,
      ContentType: mimetype,
      ContentEncoding: encoding
    };
    return new Promise((resolve, reject) => {
      AWSs3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    
  } catch (err) {
    throw new Error(err);
  }
}

module.exports.deleteFile = async (url) => {
  try {
    if(!url) {
      throw new Error({
        status: 500,
        message: 'Internal Server error: Invalid url'
      });
    }

    const filename = url.split('/').pop();
    const params = {
      Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
      Key: filename
    };

    return new Promise((resolve, reject) => {
      AWSs3.deleteObject(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    
  } catch (err) {
    throw new Error(err);
  }

}

