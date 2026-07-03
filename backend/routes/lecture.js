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
      return req.status(400).json({ message: "lectureTitle is required" });
    }

    const newLecture = await lecture.create({ lectureTitle });
    const course = await courseModel.findById(courseId);
    if (course) {
      course.lectures.push(newLecture._id);
    }
    course.populate("lecture");
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

export default lectureRoute;
