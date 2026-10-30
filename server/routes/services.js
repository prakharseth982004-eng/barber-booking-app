import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// GET /api/services -> saari services dikhao
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// POST /api/services -> nayi service add karo
router.post("/", async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;