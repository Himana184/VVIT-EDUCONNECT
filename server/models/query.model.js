import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "query title is required"],
    },
    description: {
      type: String,
      required: [true, "query description is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
    category: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
      required: [true, "student details are required"],
    },
    branch: {
      type: String,
      required: [true, "student branch is required"],
    },
    comments: [
      {
        type: String,
      },
    ],
    resolvedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Query", querySchema);
