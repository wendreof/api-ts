import * as multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}Image`);
  }
});

const uploads = multer({ storage });

export default uploads;
