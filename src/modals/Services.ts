import mongoose, { Schema, Model } from "mongoose";
import { IService } from "@/types/type"; // Ensure IService is updated

const serviceSchema: Schema<IService> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^[0-9]{10}$/, "Contact number must be 10 digits"],
    },
    company: {
      type: String,
      required: [true, "Bike company is required"],
      trim: true,
      maxlength: [50, "Company name too long"],
    },
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
      trim: true,
    },
    preferredDate: {
      type: Date,
      required: [true, "Preferred date is required"],
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Time must be in HH:MM format (24-hour)",
      ],
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", serviceSchema);

export default Service;
