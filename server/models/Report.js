import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    description: String,
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: { lat: Number, lng: Number },
    status: { type: String, default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
