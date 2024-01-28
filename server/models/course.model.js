import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, "course name is required"],
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Student",
    required: [true, "student details are required"],
  },
  coursePlatform: {
    type: String,
    required: [true, "course platform is required"],
  },
  completionStatus: {
    type: String,
    enum: ["pending", "completed"],
    required: [true, "completion status is required"],
  },
  startDate: {
    type: Date,
    required: [true, "course start date is required"],
  },
  completionDate: {
    type: Date,
  },
  certificate: {
    type: String,
    required: [true, "course completion certificate is required"],
  },
  tags: [
    {
      type: String,
      required: [true, "course tags are required"],
    },
  ],
});

export default mongoose.model("Course", courseSchema);
