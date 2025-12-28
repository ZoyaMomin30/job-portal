import { extractTextFromResume } from "../../../services/resumeParser.service";
import Resume from "../models/Resume";

export const uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Step 1: Extract text
    const resumeText = await extractTextFromResume(filePath);

    // Step 2: Store raw data
    const resume = await Resume.create({
      filePath,
      rawText: resumeText,
      status: "PARSED"
    });

    res.status(200).json({
      success: true,
      resumeId: resume._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
