const crypto = require('crypto');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// this "ACTS" as multer setup via multer-storage-cloudinary
/*const storage = new CloudinaryStorage({
  cloudinary,
  // params: {
    folder: 'social-uploads', // cloud folder
    allowedFormats: ['jpeg', 'jpg', 'gif', 'png'],
    filename: function (req, file, cb) {  
      let buf = crypto.randomBytes(16);
      buf = buf.toString('hex');
      // get rid of filename extension
      let originalName = file.originalname.replace(/\.jpeg|\.jpg|\.gif|\.png/ig, '');
      uniqueFileName = `${file.fieldname}-${Date.now()}-${originalName}${buf}`;
      cb(null, uniqueFileName);
    }
  // }
});*/

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blog', // cloud folder
    allowed_formats: 'jpeg, jpg, gif, png',
    // public_id: function (req, file, cb) {
      // `${file.fieldname}-${Date.now()}-${file.originalname}`
    // }
  }
});
module.exports = { cloudinary, storage };