import mongoose from "mongoose";

export const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to mongo ...");

    mongoose.connection.on("connected", () => {
      console.log("Connected to mongo ...");
    });

    mongoose.connection.on("error", (err) => {
      console.error(` Mongo DB Error: ${err}`);
    });
  } catch (err) {
    console.log("Mongo DB :", err);
    process.exit(1);
  }
};
