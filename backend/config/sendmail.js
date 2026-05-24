import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "CodeLikePro Password Reset Verification",
      text: `Your OTP is ${otp}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>OTP Verification</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="color: blue;">
            ${otp}
          </h1>
          <p>
            This OTP is valid for 5 minutes.
          </p>
        </div>
      `,
    });

    console.log("Email Sent to:", email);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};

export { transporter, sendEmail };
