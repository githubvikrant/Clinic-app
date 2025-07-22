import mongoose from "mongoose";

let dbConnected = false; // 🔴 Default to false

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Aditya",
    })
    .then(() => {
      dbConnected = true;
      console.log("✅ Connected to database!");
    })
    .catch((err) => {
      dbConnected = false;
      console.log("❌ Error while connecting to database:", err);
    });
};

export const getDBStatus = () => dbConnected; // ✅ Export the status
