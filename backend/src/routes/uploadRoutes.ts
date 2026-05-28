import { Router } from "express";
import { uploadCSV } from "../controllers/uploadController";
import { upload } from "../utils/multer";

const router = Router();

router.post("/upload", upload.single("file"), uploadCSV);

export default router;
