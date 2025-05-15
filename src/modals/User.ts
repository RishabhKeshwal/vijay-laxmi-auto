import mongoose, { Schema, Model } from "mongoose";
import { IUser, UserRole } from "@/types/type";

// Define the schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      index: true, // Index for faster lookups
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Exclude from queries by default for security
    },
    name: {
      type: String,
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    role: {
      type: String,
      enum: {
        values: Object.values(UserRole),
        message:
          "Invalid role: {VALUE}. Allowed values are: " +
          Object.values(UserRole).join(", "),
      },
      default: UserRole.USER, // Explicitly set default to "user"
      required: [true, "Role is required"],
    },
    isVerified: {
      type: Boolean,
      default: false, // New users need verification
    },
    verificationToken: {
      type: String,
      select: false, // Hidden by default
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true },
  }
);

// Ensure unique email index
userSchema.index({ email: 1 }, { unique: true });

// Prevent model redefinition
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
