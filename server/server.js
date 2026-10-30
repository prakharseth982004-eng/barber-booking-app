import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import serviceRoutes from "./routes/services.js";
import barberRoutes from "./routes/barbers.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Connection error:", err.message));