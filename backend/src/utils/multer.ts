import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (path.extname(file.originalname) !== ".csv") {
      cb(new Error("Only CSV files are allowed"));
    } else {
      cb(null, true);
    }
  },
});
