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

export default router;
