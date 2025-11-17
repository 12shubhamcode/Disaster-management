import express from "express";
import Report from "../models/Report.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create report
router.post("/", auth, async (req, res) => {
  try {
    const { type, description, location } = req.body;
    const report = await Report.create({
      type,
      description,
      location,
      reporter: req.user.id,
    });
    res.json(report);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Get all reports
router.get("/", auth, async (req, res) => {
  const reports = await Report.find()
    .populate("reporter", "name email")
    .sort({ createdAt: -1 });
  res.json(reports);
});

export default router;
