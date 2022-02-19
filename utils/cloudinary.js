import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// this "ACTS" as multer setup via multer-storage-cloudinary

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

const removeOnErr = async (filename) => {
  await cloudinary.uploader.destroy(filename);
};
module.exports = { cloudinary, storage, removeOnErr };