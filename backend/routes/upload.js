import express from "express";
import upload from "../middleware/multer.js";
import uploadOnCloudinary from "../utils/cloudinaryUpload.js";
import fs from "fs";

const uploadRouter = express.Router();

uploadRouter.post(
  "/uploadprofilephoto",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const localFilePath = req.file.path;
      const uploadedFile = await uploadOnCloudinary(localFilePath);

      if (!uploadedFile) {
        return res.status(500).json({
          message: "Cloudinary upload failed",
        });
      }

      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }

      res.status(200).json({
        message: "file uploaded successfully",
        imageUrl: uploadedFile.secure_url,
      });
    } catch (error) {
      res.status(500).json({ message: "upload photo error -" + error.message });
    }
  },
);

export default uploadRouter;
