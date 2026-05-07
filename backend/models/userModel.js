import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 30,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 30,
    },
    descprition: {
      type: String,
      max: 150,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["student", "educator"],
        message: "{VALUE} is not supported",
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    },
  },
  { timestamps: true },
);


const user= mongoose.model("user", userSchema)

export default userSchema