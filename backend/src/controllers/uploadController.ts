import { Request, Response } from "express";
import { processCSV } from "../services/csvProcessor";

export const uploadCSV = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await processCSV(req.file.path);

    res.json({
      message: "File processed successfully",
      downloadUrl: `/download/${result.outputFileName}`,
      metrics: {
        processingTimeMs: result.processingTimeMs,
        departments: result.departmentCount,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process CSV file" });
  }
};
