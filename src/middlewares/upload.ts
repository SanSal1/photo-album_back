import multer, { diskStorage, FileFilterCallback } from 'multer';
import path from 'path';

const validateFileType = function (file: Express.Multer.File, cb: FileFilterCallback) {
  const fileTypes = /png|jpg|jpeg|gif|svg/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};

// TODO: Temporarily store images to this folder in development
const storageEngine = diskStorage({
  destination: './images',
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 },
  fileFilter: (_req, file, cb) => {
    validateFileType(file, cb);
  },
});

export default upload;
