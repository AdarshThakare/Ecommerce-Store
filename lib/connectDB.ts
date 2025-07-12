import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// ----
let cached = global.mongoose as MongooseCache | undefined;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached;
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "NextJs-Ecommerce-Store",
    };

    const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

    if (!MONGO_URI) {
      throw new Error(
        "Please define the NEXT_PUBLIC_MONGO_URI environment variable"
      );
    }

    cached.promise = mongoose.connect(MONGO_URI, opts);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
