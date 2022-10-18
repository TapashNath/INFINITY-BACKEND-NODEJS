const multer = require("multer");
const fs = require("fs");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    var dir = "uploads/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    req.image_name = file.fieldname + "_" + Date.now() + ".png";
    cb(null, file.fieldname + "_" + Date.now() + ".png");
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});
module.exports = imageUpload;
