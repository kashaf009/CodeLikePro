import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 30,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8
      
    },
    descprition: {
      type: String,
      maxlength: 150,
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
    enrolledCourse:{
      type:mongoose.Schema.Types.ObjectId,
      // ref:course
    }
  },
  { timestamps: true },
);


const user= mongoose.model("user", userSchema)

export default user