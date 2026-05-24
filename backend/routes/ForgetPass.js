import express from "express";
import user from "../models/userModel";
import { sendEmail } from "../config/sendmail";

const otpRouter = express.Router();

otpRouter.post("/sendotp", async (req, res) => {
  try {
    const { toEmailId } = req.body;
    // verify email
    const verifedUser = await user.findOne({ emailId: toEmailId });

    if (!verifedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate otp
    const otp = Math.floor(1000 + Math.random() * 9000);

    // send otp

    const success = await sendEmail(toEmailId, otp);
    if (!success) {
      return res.status(500).json({
        message: "Email sending failed",
      });
    }

    // store otp in user model
    verifedUser.otp = otp;

    verifedUser.otpExpire = Date.now() + 5 * 60 * 1000;

    verifedUser.isOtpVerified = false;

    await verifedUser.save();

    // send res
    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// verify otp

otpRouter.post("/verifyotp", async (req, res) => {
  try {
    const { toEmailId } = req.body;
    const { otp } = req.body;

    // verify email

    const verifedUser = await user.findOne({ emailId: toEmailId });

    // verify otp

    if (!verifedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // CHECK EXPIRY
    if (Date.now() > verifedUser.otpExpire) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // verify otp
    if (verifedUser.otp !== otp) {
      return res.status(401).json({ message: "invalid OTP" });
    }

    // if all correct

    verifedUser.isOtpVerified = true;
    verifedUser.otp = null;
    verifedUser.otpExpire = null;

    await verifedUser.save();

    return res.status(200).json({ message: "Verification Successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});




export default otpRouter;
