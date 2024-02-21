import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Certification name is required"],
    },
    issuer: {
      type: String,
      required: [true, "Issuer name is required"],
    },
    certificateId: {
      type: String,
      required: [true, "Certificate ID is required"],
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
      required: [true, "Student details are required"],
    },
    issueDate: {
      type: Date,
      required: [true, "Certificate Issue date is required"],
    },
    expiryDate: {
      type: Date,
    },
    tags: [
      {
        type: String,
        required: [true, "Atleast one tag is required"],
      },
    ],
    link: {
      type: String,
      required: [true, "Certification link is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Certification", certificationSchema);
