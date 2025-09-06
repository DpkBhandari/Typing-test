import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "mod"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    accountType: {
      type: String,
      default: "free",
      enum: ["free", "premium"],
    },
    emailExpiryCode: {
      type: String,
    },
    phoneExpiryCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
