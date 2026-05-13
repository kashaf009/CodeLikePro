import express from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import user from "../models/userModel.js";
import getToken from "../config/token.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    let { name, emailId, password, role } = req.body;

    if (!name || !emailId || !password || !role) {
      return res.status(400).json({ message: "all fields are required" });
    }

    name = name.trim();
    emailId = emailId.trim().toLowerCase();

    const checkExisistingUser = await user.findOne({ emailId });

    if (checkExisistingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    if (!validator.isEmail(emailId)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid emailid",
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain:-1 uppercase, 1 lowercase, 1 number, 1 symbol, minimum 8 characters",
      });
    }

    if (name.length < 4 || name.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Name must be more then 4 letter and less then 30",
      });
    }

    const validRoles = ["student", "educator"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Enter valid role" });
    }

    // hash password

    const hashPass = await bcrypt.hash(password,10);

    // create db

    const User = new user({
      name,
      emailId,
      password: hashPass,
      role,
    });



    

    const token =await getToken(User._id)
    res.cookie("token",token,{
      "httpOnly":true,
      "secure":false,
      "sameSite":"Strict",
      "maxAge":7*24*60*60*1000

    })


    await User.save();



    const safeinfo = {
      id: User._id,
      name: User.name,
      emailId: User.emailId,
      role: User.role,
    };

    return res
      .status(201)
      .json({ success: true, message: "signup successfull", user: safeinfo });
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
});


export default authRouter
