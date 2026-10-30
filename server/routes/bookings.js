import express from "express";
import Booking from "../models/Booking.js";
import Barber from "../models/Barber.js";
import Service from "../models/Service.js";

const router = express.Router();

// GET /api/bookings -> saari bookings (barber aur service ke naam ke saath)
router.get("/", async (req, res) => {
  const bookings = await Booking.find()
    .populate("service")
    .populate("barber");
  res.json(bookings);
});

// POST /api/bookings -> nayi booking
router.post("/", async (req, res) => {
  try {
    const { customerName, customerPhone, service, barber, date, time } =
      req.body;

    // 1. Barber check
    const barberDoc = await Barber.findById(barber);
    if (!barberDoc) {
      return res.status(404).json({ message: "Barber not found" });
    }
    if (!barberDoc.isAvailable) {
      return res.status(400).json({ message: "Barber is not available" });
    }

    // 2. Service check
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(404).json({ message: "Service not found" });
    }

    // 3. Kaam ke ghanton ke andar hai ya nahi
    if (time < barberDoc.workStart || time >= barberDoc.workEnd) {
      return res.status(400).json({
        message: `Barber works from ${barberDoc.workStart} to ${barberDoc.workEnd}`,
      });
    }

    // 4. Double booking check
    const alreadyBooked = await Booking.findOne({
      barber,
      date,
      time,
      status: "booked",
    });
    if (alreadyBooked) {
      return res.status(409).json({ message: "This slot is already booked" });
    }

    // 5. Sab sahi hai, booking save karo
    const booking = await Booking.create({
      customerName,
      customerPhone,
      service,
      barber,
      date,
      time,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/bookings/:id/cancel -> booking cancel
router.patch("/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;