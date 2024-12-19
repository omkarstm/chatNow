import multer from "multer";
import path from "path";
import * as fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Set the destination for uploaded files
      const uploadDir = './uploads';
      // Create the directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});


export const upload = multer({
    storage: storage,
    limits: { fileSize: 1000 * 1024 * 1024 }, // limit file size to 10MB
    fileFilter: (req, file, cb) => {
      // Restrict file types to images only (jpg, jpeg, png, gif)
      const fileTypes = /jpeg|jpg|png|gif/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
  
      if (extname && mimeType) {
        return cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only images are allowed.'));
      }
    }
  });