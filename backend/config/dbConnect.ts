import mongoose, { ConnectOptions, Connection } from "mongoose";

declare const global: {
  mongoose: {
    con: Connection | null;
    promise: Promise<Connection> | null;
  };
};

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}

const dbConnect = async () => {
  if (cached.con) {
    return cached.con;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then(() => {
      return mongoose.connection; // Return the connection here
    });
  }

  try {
    cached.con = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.con;
};

export default dbConnect;
