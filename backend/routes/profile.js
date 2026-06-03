import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import uploadOnCloudinary from "../utils/cloudinaryUpload.js";
import user from "../models/userModel.js";
import fs from "fs";

const profileRoute = express.Router();

profileRoute.get("/profile", isAuth, async (req, res) => {
  try {
    const user = req.user;
    const safeinfo = {
      id: user._id,
      name: user.name,
      emailId: user.emailId,
      role: user.role,
      photoUrl: user.photoUrl,
    };

    res.status(200).json({ user: safeinfo });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

profileRoute.post(
  "/updateProfile",
  upload.single("photoUrl"),
  isAuth,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { name, descprition } = req.body;

      const updateData = {};

      if (name) {
        updateData.name = name;
      }

      if (descprition) {
        updateData.descprition = descprition;
      }

      // Upload image if provided

      if (req.file) {
        const uploadedFile = await uploadOnCloudinary(req.file.path);

        updateData.photoUrl = uploadedFile.secure_url;

        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }
      const User = await user.findByIdAndUpdate(userId,updateData);

      const safeinfo = {
      id: User._id,
      name: User.name,
      emailId: User.emailId,
      role: User.role,
      photoUrl: User.photoUrl,
    };

      if (!User) {
        return res.status(404).json({ message: "user not found" });
      }

      res.status(200).json({message:"profile updated successfully",
        user:safeinfo
      })
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
);

export default profileRoute;
