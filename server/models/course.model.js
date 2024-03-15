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
  branch: {
    type: String,
    required: [true, "Student branch is required"],
  },
  coursePlatform: {
    type: String,
    required: [true, "course platform is required"],
  },
  completionStatus: {
    type: String,
    enum: ["Pending", "Completed"],
    required: [true, "completion status is required"],
  },
  courseLink: {
    type: String,
    required: [true, "Course Link is required"],
  },
  startDate: {
    type: Date,
    required: [true, "course start date is required"],
  },
  endDate: {
    type: Date,
  },
  certificate: {
    type: String,
  },
});

export default mongoose.model("Course", courseSchema);
