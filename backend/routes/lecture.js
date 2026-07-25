import express from "express";
import mongoose from "mongoose";
import isAuth from "../middleware/isAuth.js";
import lecture from "../models/LectureModel.js";
import courseModel from "../models/courseModel.js";
import user from "../models/userModel.js";
import uploadOnCloudinary from "../utils/cloudinaryUpload.js";
import fs from "fs";
import upload from "../middleware/multer.js";

const lectureRoute = express.Router();

lectureRoute.post("/createLecture/:courseId", isAuth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureTitle } = req.body;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "lectureTitle is required" });
    }

    const newLecture = await lecture.create({ lectureTitle });
    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    if (course) {
      course.lectures.push(newLecture._id);
    }
    course.populate("lectures");
    await course.save();
    return res.status(200).json({
      message: "leacture created successfully",
      lecture: newLecture,
      course: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to create lecture ${error.message}` });
  }
});

lectureRoute.get("/getCourseLectures/:courseId", isAuth, async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course Not found" });
    }
    await course.populate("lectures");

    res
      .status(200)
      .json({ message: "courseLecture fetched successfully", course: course });
  } catch (error) {
    res.status(500).json({ message: `Failed to get lecture ${error.message}` });
  }
});

// edit lecture

lectureRoute.patch(
  "/editLecture/:lectureId",
  upload.single("video"),
  isAuth,
  async (req, res) => {
    try {
      const { lectureId } = req.params;
      const { lectureTitle, isPreviewFree } = req.body;

      const lectureinfo =await lecture.findById(lectureId);

      if (!lectureinfo) {
        return res.status(400).json({ message: "lecture not found" });
      }

      if (lectureTitle) {
        if (lectureTitle.length < 4 || lectureTitle.length > 60) {
          return res
            .status(400)
            .json({ message: "title must be more then 4 and less then 80" });
        }
        lectureinfo.lectureTitle = lectureTitle;
      }
      if (isPreviewFree != undefined) {
        lectureinfo.isPreviewFree = isPreviewFree;
      }

      if (req.file) {
        const uplodedFile = await uploadOnCloudinary(req?.file?.path);
        lectureinfo.videoUrl = uplodedFile.secure_url;

        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }


      await lectureinfo.save()
      res.status(200).json({message:"lecture Updated successfuly" , data:lectureinfo})
    } catch (error) {
      res.status(500).json({message:`edit course error ${error.message}`})
    }
  },
);

lectureRoute.get("/getProgress/:courseId", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const userDoc = await user.findById(userId);
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const progress = Array.isArray(userDoc.courseProgress)
      ? userDoc.courseProgress.find(
          (p) => p.course && p.course.toString() === courseId,
        )
      : null;

    return res.status(200).json({
      completedLectures: progress ? progress.completedLectures : [],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getProgress Error ${error.message}` });
  }
});

lectureRoute.post("/saveProgress/:courseId", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;
    const { completedLectures } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    if (!Array.isArray(completedLectures)) {
      return res
        .status(400)
        .json({ message: "completedLectures must be an array" });
    }

    const userDoc = await user.findById(userId);
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(userDoc.courseProgress)) {
      userDoc.courseProgress = [];
    }

    const existing = userDoc.courseProgress.find(
      (p) => p.course && p.course.toString() === courseId,
    );

    const validLectures = completedLectures.filter((id) =>
      mongoose.Types.ObjectId.isValid(id),
    );

    if (existing) {
      existing.completedLectures = validLectures;
    } else {
      userDoc.courseProgress.push({
        course: new mongoose.Types.ObjectId(courseId),
        completedLectures: validLectures,
      });
    }

    await userDoc.save();

    return res.status(200).json({
      completedLectures: existing
        ? existing.completedLectures
        : userDoc.courseProgress.find(
            (p) => p.course.toString() === courseId,
          ).completedLectures,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `saveProgress Error ${error.message}` });
  }
});

export default lectureRoute;
