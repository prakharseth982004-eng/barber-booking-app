import express from "express";
import Barber from "../models/Barber.js";

const router = express.Router();

// GET /api/barbers -> saare barbers dikhao
router.get("/", async (req, res) => {
  const barbers = await Barber.find();
  res.json(barbers);
});

// POST /api/barbers -> naya barber add karo
router.post("/", async (req, res) => {
  try {
    const barber = await Barber.create(req.body);
    res.status(201).json(barber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;