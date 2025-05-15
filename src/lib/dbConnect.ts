import mongoose from "mongoose";

// Define a cached connection interface
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use global to persist connection across serverless invocations
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

const dbConnect = async (): Promise<typeof mongoose> => {
  // Return cached connection if available
  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection");
    return cached.conn;
  }

  // If a connection is in progress, wait for it
  if (cached.promise) {
    console.log("⏳ Waiting for existing MongoDB connection...");
    return await cached.promise;
  }

  // Get MongoDB URI from environment
  const mongoUri = process.env.MOONGO_DB_URI;
  if (!mongoUri) {
    console.error("❌ MONGO_DB_URI is missing! Define it in your .env file.");
    throw new Error("MONGO_DB_URI is not defined in environment variables.");
  }

  try {
    console.log("🔗 Establishing new MongoDB connection...");

    // Start connection and cache the promise
    cached.promise = mongoose.connect(mongoUri, {
      dbName: process.env.DB_NAME || "laxmi-auto", // Use a specific default
      bufferCommands: false, // Disable buffering if connection fails
    });

    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected Successfully!");
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise on failure
    console.error("❌ MongoDB Connection Failed:", (error as Error).message);
    throw error; // Rethrow to let callers handle it
  }
};

export default dbConnect;
