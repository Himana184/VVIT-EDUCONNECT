import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "company name is required"],
    },
    role: {
      type: String,
      required: [true, "internship role is required"],
    },
    stipend: {
      type: Number,
      required: [true, "stipend amount is required"],
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
    internshipDomain: {
      type: String,
      required: [true, "Internship domain is required"],
    },
    offerLetter: {
      type: String,
      required: [true, "offer letter document is required"],
    },
    startDate: {
      type: Date,
      required: [true, "internship start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "internship end date is required"],
    },
    internshipType: {
      type: String,
      required: [true, "internship type is required"],
    },
    completionCertificate: {
      type: String,
    },
    verificationStatus: {
      type: String,
      default : "Pending",
      enum: ["Pending", "Verified", "Rejected"],
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.SchemaTypes.String.set("trim", true);

export default mongoose.model("Internship", internshipSchema);
