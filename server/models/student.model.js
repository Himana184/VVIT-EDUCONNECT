import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
    collegemail: {
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
      },
    ],
    role: {
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

//generate access token for the student document
studentSchema.methods.createAccessToken = async function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
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

// Make all strings have option `trim` equal to true. (remove whitespaces)
mongoose.Schema.String.set("trim", true);

export default new mongoose.model("Student", studentSchema);
