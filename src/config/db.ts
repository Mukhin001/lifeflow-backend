import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("Mongo connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongo disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongo error:", err);
});

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI не найден");
  }

  await mongoose.connect(mongoUri);
};
