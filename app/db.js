// app/db.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable in .env.local.");
}

let isConnected = false;

export async function connectToDB() {
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(MONGO_URI);
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw new Error("Failed to connect to MongoDB");
    }
}
