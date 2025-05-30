const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/x-icon": "ico",
  "image/heif": "heif",
  "image/heic": "heic",
  "image/x-xbitmap": "xbm",
  "image/vnd.microsoft.icon": "ico",
  "image/avif": "avif",
};

// Ensure upload folder exists
const uploadPath = path.join(__dirname, '..', 'uploads', 'images');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    if (!ext) {
      return cb(new Error("Unsupported file type"), null);
    }
    cb(null, uuidv4() + "." + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  cb(isValid ? null : new Error("Invalid mime type!"), isValid);
};

const fileUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter,
});

module.exports = fileUpload;
