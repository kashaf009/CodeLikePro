import express from "express";
import isAuth from "../middleware/isAuth";

const courseRoute = express.Router();

// create course api
courseRoute.post("/createCourse", isAuth, async (req, res) => {
  try {
    // body and user id

    const userId = req.user._id;
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "title and category are required" });
    }

    if (title.length < 4 || title.length > 80) {
      return res
        .status(400)
        .json({ message: "title must be more then 4 and less then 80" });
    }   


    // create course in db      



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
