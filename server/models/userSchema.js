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
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "", // Can store image URL later
    },
  },
  { timestamps: true } // Creates createdAt & updatedAt automatically
);

const User = mongoose.model("User", userSchema);

export default User;
