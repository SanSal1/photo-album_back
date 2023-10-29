import multer, { memoryStorage, FileFilterCallback } from 'multer';
import path from 'path';

const fileFilter = function (req: { body: { private: unknown } }, file: Express.Multer.File, cb: FileFilterCallback) {
  // Validate body before saving the file
  const priv = req.body.private;
  if (!(typeof priv === 'boolean' || priv === 'true' || priv === 'false')) {
    return cb(null, false);
  }
  // Validate file type
  const fileTypes = /png|jpg|jpeg|gif|svg/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter,
});

export default upload;
