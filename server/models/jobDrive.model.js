import mongoose from "mongoose";

const jobDrive = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    roles: [
      {
        type: String,
        required: [true, "Job role is required"],
      },
    ],
    categories: [
      {
        type: String,
        required: [true, "Job Category is required"],
      },
    ],
    jobLocation: {
      type: String,
      required: [true, "Job location is required"],
    },
    lastDate: {
      type: Date,
      required: [true, "Last date to apply is required"],
    },
    salary: {
      type: String,
      required: [true, "Salary is required"],
    },
    skills: [
      {
        type: String,
        required: [true, "Skills are required"],
      },
    ],
    eligibleBranches: [
      {
        type: String,
        required: [true, "Eligible Branches is required"],
      },
    ],
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    optedStudents: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Student",
      },
    ],
    files: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("JobDrive", jobDrive);
