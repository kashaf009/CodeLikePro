import express from "express";
import isAuth from "../middleware/isAuth.js";
import courseModel from "../models/courseModel.js";
import user from "../models/userModel.js";
import upload from "../middleware/multer.js";
import mongoose from "mongoose"
import uploadOnCloudinary from "../utils/cloudinaryUpload.js";
import fs from "fs";

const courseRoute = express.Router();

// create course api
courseRoute.post("/createCourse", isAuth, async (req, res) => {
  try {
    // body and user id

    const userId = req.user._id;
    const { title, category } = req.body;

    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "title and category are required" });
    }

    if (title.length < 4 || title.length > 80) {
      return res
        .status(400)
        .json({ message: "title must be more then 4 and less then 80" });
    }

    const course = await courseModel.create({
      title,
      category,
      creator: userId,
    });

    if (!course) {
      return res.status(400).json({ message: "course creation failed" });
    }

    return res
      .status(200)
      .json({ message: "course created successfully", data: course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `createCourse Error ${error.message}` });
  }
});

// get all published courses api

courseRoute.get("/Courses", isAuth, async (req, res) => {
  try {
    const courses = await courseModel
      .find({ ispublished: true })
      .populate("creator", "name emailId photoUrl")
      .populate("lectures");

    return res
      .status(200)
      .json({ message: "courses fetched successfully", data: courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getAllCourses Error ${error.message}` });
  }
});

//  get creator courses api

courseRoute.get("/MyCourses", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const courses = await courseModel
      .find({ creator: userId })
      .populate("creator", "name emailId photoUrl");

    return res
      .status(200)
      .json({ message: "courses fetched successfully", data: courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `MyCourses Error ${error.message}` });
  }
});

// edit/update course api

courseRoute.patch(
  "/editCourse/:courseId",
  upload.single("thumbnail"),
  isAuth,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { courseId } = req.params;
      const { title, category, ispublished, level, price, description } =
        req.body;
      const updateData = {};

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({
          message: "Invalid course id",
        });
      }

      if (title) {
        if (title.length < 4 || title.length > 80) {
          return res
            .status(400)
            .json({ message: "title must be more then 4 and less then 80" });
        }
        updateData.title = title;
      }

      if (category) {
        updateData.category = category;
      }

      if (ispublished !== undefined) {
        updateData.ispublished = ispublished;
      }

      if (level) {
        updateData.level = level;
      }

      if (price !== undefined) {
        updateData.price = price;
      }

      if (description) {
        updateData.description = description;
      }

      if (req.file) {
        const uploadedFile = await uploadOnCloudinary(req.file.path);

        updateData.thumbnail = uploadedFile.secure_url;

        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }

      const course = await courseModel.findOneAndUpdate(
        { _id: courseId, creator: userId },
        updateData,
        { new: true },
      );

      if (!course) {
        return res.status(404).json({
          message: "course not found or you are not creator of this course",
        });
      }

      return res
        .status(200)
        .json({ message: "course updated successfully", data: course });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `editCourse Error ${error.message}` });
    }
  },
);

// delete course api

courseRoute.delete("/deleteCourse/:courseId", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const course = await courseModel.findOneAndDelete({
      _id: courseId,
      creator: userId,
    });

    if (!course) {
      return res.status(404).json({
        message: "course not found or you are not creator of this course",
      });
    }

    return res.status(200).json({ message: "course deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `deleteCourse Error ${error.message}` });
  }
});

courseRoute.post("/enroll/:courseId", isAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;
    const { amount } = req.body;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ message: "Enter a valid numeric amount" });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    const alreadyEnrolled = Array.isArray(course.enrolled)
      ? course.enrolled.some((id) => id.toString() === userId.toString())
      : course.enrolled?.toString() === userId.toString();

    if (alreadyEnrolled) {
      return res.status(200).json({ message: "Already enrolled" });
    }

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourse: courseId } },
      { new: true },
    );

    course.enrolled = Array.isArray(course.enrolled) ? course.enrolled : [];
    if (!course.enrolled.some((id) => id.toString() === userId.toString())) {
      course.enrolled.push(userId);
    }
    await course.save();

    const safeinfo = {
      id: updatedUser._id,
      name: updatedUser.name,
      emailId: updatedUser.emailId,
      role: updatedUser.role,
      photoUrl: updatedUser.photoUrl,
      descprition: updatedUser.descprition,
      enrolledCourse: updatedUser.enrolledCourse,
    };

    return res.status(200).json({
      message: "Enrollment successful",
      user: safeinfo,
    });
  } catch (error) {
    return res.status(500).json({ message: `enroll course Error ${error.message}` });
  }
});

// get course by id api

courseRoute.get("/Course/:courseId", isAuth, async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await courseModel
      .findById(courseId)
      .populate("creator", "name emailId photoUrl").
      populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    return res
      .status(200)
      .json({ message: "course fetched successfully", data: course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getCourse Error ${error.message}` });
  }
});

export default courseRoute;
