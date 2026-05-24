import express from "express";
import user from "../models/userModel.js";
import { sendEmail } from "../config/sendmail.js";
import bcrypt from "bcrypt";
import validator from "validator";

const otpRouter = express.Router();

otpRouter.post("/sendotp", async (req, res) => {
  try {
    const { toEmailId } = req.body;
    // verify email
    const verifiedUser = await user.findOne({ emailId: toEmailId });

    if (!verifiedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate otp
    const otp = String(Math.floor(1000 + Math.random() * 9000));

    // send otp

    const success = await sendEmail(toEmailId, otp);
    if (!success) {
      return res.status(500).json({
        message: "Email sending failed",
      });
    }

    // store otp in user model
    verifiedUser.otp = otp;

    verifiedUser.otpExpire = Date.now() + 5 * 60 * 1000;

    verifiedUser.isOtpVerified = false;

    await verifiedUser.save();

    // send res
    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ###### verify otp

otpRouter.post("/verifyotp", async (req, res) => {
  try {
    const { toEmailId } = req.body;
    const { otp } = req.body;

    // verify email

    const verifiedUser = await user.findOne({ emailId: toEmailId });

    // verify otp

    if (!verifiedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!verifiedUser.otp) {
      return res.status(400).json({
        message: "No OTP found",
      });
    }

    // CHECK EXPIRY
    if (Date.now() > verifiedUser.otpExpire) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // verify otp
    if (String(verifiedUser.otp) !== String(otp)) {
      return res.status(401).json({ message: "invalid OTP" });
    }

    // if all correct

    verifiedUser.isOtpVerified = true;
    verifiedUser.otp = null;
    verifiedUser.otpExpire = null;

    await verifiedUser.save();

    return res.status(200).json({ message: "Verification Successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ##### reset password

otpRouter.patch("/resetpassword", async (req, res) => {
  try {
    const { toEmailId, newPassword } = req.body;

    const verifiedUser = await user.findOne({ emailId: toEmailId });
    if (!verifiedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    if (!verifiedUser.isOtpVerified) {
      return res.status(401).json({ message: "invalid otp " });
    }

    const isStrongPassword = validator.isStrongPassword(newPassword);
    if (!isStrongPassword) {
      return res.status(400).json({ message: "Enter strong password" });
    }

    const hassPassword = await bcrypt.hash(newPassword, 10);

    verifiedUser.password = hassPassword;
    verifiedUser.isOtpVerified = false;
    verifiedUser.otp = null;
    verifiedUser.otpExpire = null;

    await verifiedUser.save();

    return res.status(200).json({ message: "Password reset Successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default otpRouter;
