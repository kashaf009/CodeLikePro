import jwt from "jsonwebtoken";
import user from "../models/userModel.js";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Please login first." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "invalid token credential ,Please login" });
    }

     const userdata = await user.findById({_id:decoded.userId});

    if (!userdata) {

      return res.status(404).json({

        message: "User not found",

      });

    }

    req.user = userdata;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export default isAuth;
