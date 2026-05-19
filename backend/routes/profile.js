import express from "express";
import isAuth from "../middleware/isAuth.js";

const profileRoute = express.Router();

profileRoute.get("/profile", isAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ "message": error.message });
  }
});


export default profileRoute
