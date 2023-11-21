import multer from 'multer';
import { v2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import config from '../../config.js';

const maxFileSize = 4 * 1024 * 1024;
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.match(/png|jpe?g/) || file.size > maxFileSize) {
    cb(new Error('File must be a png, jpg, or jpeg under 4MB'), false);
  } else {
    cb(null, true);
  }
};

v2.config({
  cloud_name: config.cloudNname,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: 'collectify-collection-image',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [
      { if: 'w_gt_1900', width: 1900, crop: 'scale' },
      { if: 'h_gt_1900', height: 1900, crop: 'scale' },
      { quality: 'auto' },
      { format: 'jpg' },
    ],
  },
});

export const upload = multer({
  storage: storage,
  fileFilter,
});
