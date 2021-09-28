const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/uploads/');
    },
    filename: (req, file, cb) => {
  
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });

  const upload = multer({ storage });

module.exports = upload;
