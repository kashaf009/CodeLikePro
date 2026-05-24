import express from "express";
import isAuth from "../middleware/isAuth.js";

const profileRoute = express.Router();

profileRoute.get("/profile", isAuth, async (req, res) => {
  try {
    const user = req.user;
    const safeinfo = {
      id: user._id,
      name: user.name,
      emailId: user.emailId,
      role: user.role,
      photoUrl: user.photoUrl
    };

    res.status(200).json({ user:safeinfo });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


export default profileRoute
