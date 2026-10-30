import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experienceYears: { type: Number, default: 0 },
  workStart: { type: String, default: "10:00" },
  workEnd: { type: String, default: "20:00" },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model("Barber", barberSchema);