import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import reportRoutes from "./routes/reports.js";
import resourceRoutes from "./routes/resource.js";
import alertRoutes from "./routes/alerts.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://disaster-management-nh5q.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/alerts", alertRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});