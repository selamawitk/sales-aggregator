import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes";
import downloadRoutes from "./routes/downloadRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(uploadRoutes);
app.use(downloadRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

export default app;
