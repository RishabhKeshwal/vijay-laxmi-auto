import { Document } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  PUBLIC = "public",
}

// Define the user document type
export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  role: UserRole;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact {
  _id?: string;
  name: string;
  email: string;
  message: string;
  status?: "Pending" | "Replied";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService extends Document {
  user?: string; // Optional, if you plan to associate it with a user later
  name: string;
  contact: string;
  company: string; // bike make/company
  vehicleModel?: string; // renamed from 'model' to avoid conflict with mongoose
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  notes?: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
