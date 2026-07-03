import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      require: true,
    },
    isPreviewFree: {
      type: Boolean,
    },
    videoUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

const lecture = mongoose.model("lecture", LectureSchema);

export default lecture;
