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

    const hashPass = await bcrypt.hash(password, 10);

    // create db

    const User = new user({
      name,
      emailId,
      password: hashPass,
      role,
    });

    const token = await getToken(User._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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
    res.status(500).json({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({ message: "All field required" });
    }

    if (!validator.isEmail(emailId)) {
      return res.status(401).json({ message: "Enter valid EmailId" });
    }

    const verifiedUser =await user.findOne({emailId});

    if (!verifiedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const VerifyPass =await bcrypt.compare(password, verifiedUser.password);

    if (!VerifyPass) {
      return res.status(404).json({ message: "Incorrect Password" });
    }

    const token = getToken(verifiedUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "login Successfull" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

authRouter.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "logout successfull" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default authRouter;
