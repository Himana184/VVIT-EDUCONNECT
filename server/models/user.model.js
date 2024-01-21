import mongoose, { mongo } from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
      minlenth: [5, "Minimum length of 5 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid mail",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    contact: {
      type: String,
      unique: true,
      required: [true, "contact number is required"],
      validate: {
        validator: (value) => validator.isMobilePhone(value),
        message: "Please provide a valid contact number",
      },
    },
    branch: {
      type: String,
    },
    role: {
      type: String,
      required: [true, "user role is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
mongoose.Schema.String.set("trim", true);
export default new mongoose.model("User", userSchema);
