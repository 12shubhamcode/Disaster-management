import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import reportRoutes from "./routes/reports.js";
import resourceRoutes from "./routes/resource.js";
import alertRoutes from './routes/alerts.js'


dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/resources", resourceRoutes);
app.use('/api/alerts', alertRoutes)


// Public alerts endpoint (for Home.jsx)
app.get("/api/alerts", (req, res) => {
  res.json([
    {
      _id: "alert1",
      title: "Flood Warning",
      description: "Heavy rainfall in low-lying areas. Stay alert.",
      createdAt: new Date(),
    },
    {
      _id: "alert2",
      title: "Heatwave Alert",
      description: "High temperatures expected this week.",
      createdAt: new Date(),
    },
  ]);
});
 const port=process.env.PORT||3000
 app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
 })