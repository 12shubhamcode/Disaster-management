import express from "express";
import Resource from "../models/Resource.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all resources
router.get("/", auth, async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Add a new resource
router.post("/", auth, async (req, res) => {
  try {
    const { type, details } = req.body;
    const r = await Resource.create({ type, details });
    res.json(r);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Allocate (demo)
router.post("/allocate", auth, async (req, res) => {
  try {
    const { reportId } = req.body;
    const available = await Resource.findOne({ available: true });
    if (!available)
      return res.status(400).json({ message: "No available resources" });
    available.available = false;
    available.assignedTo = reportId;
    await available.save();
    res.json({ message: "Resource allocated", resource: available });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
