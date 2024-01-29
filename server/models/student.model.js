import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Internship from "./internship.model.js";
import Course from "./course.model.js";
import Certification from "./certification.model.js";

//define the student model
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student Name is required"],
      minlenth: [5, "Minimum length of 5 characters"],
    },
    rollNumber: {
      type: String,
      required: [true, "Student roll number is required"],
      unique: true,
    },
    collegeMail: {
      type: String,
      required: [true, "College Mail is required"],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid college mail",
      },
    },
    personalMail: {
      type: String,
      required: [true, "Student personal mail is required"],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    contact: {
      type: String,
      unique: true,
      required: [true, "Student contact number is required"],
      validate: {
        validator: (value) => validator.isMobilePhone(value),
        message: "Please provide a valid contact number",
      },
    },
    branch: {
      type: String,
      required: [true, "Student branch is required"],
    },
    section: {
      type: String,
      required: [true, "Student section is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    passoutYear: {
      type: Number,
      required: [true, "Passout year is required"],
    },
    counsellor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deviceTokens: [
      {
        type: String,
        select: false,
      },
    ],
    role: {
      select: false,
      type: String,
      default: "student",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

studentSchema.virtual("certifications", {
  ref: "Certification",
  localField: "_id",
  foreignField: "student",
});

studentSchema.virtual("internships", {
  ref: "Internship",
  localField: "_id",
  foreignField: "student",
});

studentSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "student",
});

studentSchema.virtual("internshipsCount").get(function () {
  return this.internships?.length || 0;
});

studentSchema.virtual("certificationsCount").get(function () {
  return this.certifications?.length || 0;
});

studentSchema.virtual("coursesCount").get(function () {
  return this.courses?.count || 0;
});

//generate access token for the student document
studentSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      user: {
        userId: this._id,
        role: "student",
        branch: this.branch,
      },
    },
    process.env.STUDENT_ACCESS_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

studentSchema.methods.isPasswordCorrect = async function (oldPassword) {
  return await bcrypt.compare(oldPassword, this.password);
};

studentSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("Student", studentSchema);
