// server/routes/alerts.js
import express from "express";
import Alert from "../models/Alert.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });
    const alert = await Alert.create(req.body);
    res.json(alert);
  } catch (err) {
    res.status(500).json({ message: "Failed to create alert" });
  }
});

// Delete alert (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });
    const deleted = await Alert.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Alert not found" });
    res.json({ message: "Alert deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete alert" });
  }
});

export default router;
