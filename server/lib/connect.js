import mongoose from "mongoose";

export default async function connect() {
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI);
}