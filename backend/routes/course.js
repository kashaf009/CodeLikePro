import express from "express";
import isAuth from "../middleware/isAuth.js";
import courseModel from "../models/courseModel.js";
import upload from "../middleware/multer.js";

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

courseRoute.get("/getAllCourses", isAuth, async (req, res) => {
  try {
    const courses = await courseModel
      .find({ ispublished: true })
      .populate("creator", "name emailId photoUrl");

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

courseRoute.get("/getMyCourses", isAuth, async (req, res) => {
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
      .json({ message: `getMyCourses Error ${error.message}` });
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

      if (ispublished) {
        updateData.ispublished = ispublished;
      }

      if (level) {
        updateData.level = level;
      }

      if (price) {
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
        return res
          .status(404)
          .json({
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
      return res
        .status(404)
        .json({
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

// get course by id api

courseRoute.get("/getCourse/:courseId", isAuth, async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await courseModel
      .findById(courseId)
      .populate("creator", "name emailId photoUrl");

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    return res
      .status(200)
      .json({ message: "course fetched successfully", data: course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getCourse Error ${error.message}` })}});   


export default courseRoute;
