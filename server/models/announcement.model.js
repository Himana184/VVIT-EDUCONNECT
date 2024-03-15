import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "announcement title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    category: {
      type: String,
      required: [true, "announcment category is required"],
    },
    branches: [
      {
        type: String,
        required: [true, "select the branches for announcement"],
      },
    ],
    file: {
      type: String,
    },
    priority: {
      type: String,
      required: [true, "announcement priority is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Announcement", announcementSchema);
