import mongoose, { mongo } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
      select: false,
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
    loginAccess: {
      type: Boolean,
      default: true,
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

//generate access token
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      user: {
        userId: this._id,
        role: this.role,
        branch: this.branch,
      },
    },
    process.env.USER_ACCESS_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

//compare the password received and password in db
userSchema.methods.isPasswordCorrect = async function (oldPassword) {
  return await bcrypt.compare(oldPassword, this.password);
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);
