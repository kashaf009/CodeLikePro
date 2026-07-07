import express from "express";
import isAuth from "../middleware/isAuth.js";
import lecture from "../models/LectureModel.js";
import courseModel from "../models/courseModel.js";

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

    const course =await courseModel.findById(courseId);
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

export default lectureRoute;
