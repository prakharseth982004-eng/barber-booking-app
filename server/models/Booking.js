import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    barber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barber",
      required: true,
    },
    date: { type: String, required: true }, // jaise "2026-11-02"
    time: { type: String, required: true }, // jaise "14:30"
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);