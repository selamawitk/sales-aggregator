import { Router } from "express";
import path from "path";
import fs from "fs";

const router = Router();

router.get("/download/:fileName", (req, res) => {
  const filePath = path.join(__dirname, "../../outputs", req.params.fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath);
});

export default router;
