import express from "express";
import { upload } from "../utils/fileUpload";
import { uploadResume } from "../controllers/resume.controller";

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);

export default router;
