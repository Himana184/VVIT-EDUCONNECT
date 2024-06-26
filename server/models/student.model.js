import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Internship from "./internship.model.js";
import Course from "./course.model.js";
import Certification from "./certification.model.js";
import Query from "./query.model.js";
//define the student model
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student Name is required"],
      minlenth: [5, "Minimum length of 5 characters"],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, "Student roll number is required"],
      unique: true,
      trim: true,
    },
    collegeMail: {
      type: String,
      required: [true, "College Mail is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid college mail",
      },
    },
    personalMail: {
      type: String,
      trim: true,
      lowercase: true,
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
      trim: true,
    },
    contact: {
      type: String,
      unique: true,
      trim: true,
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
      },
    ],
    role: {
      select: false,
      type: String,
      default: "student",
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    verified: {
      type: Boolean,
      default: false,
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

studentSchema.virtual("queries", {
  ref: "Query",
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
  return this.courses?.length || 0;
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
    process.env.ACCESS_TOKEN_SECRET,
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
