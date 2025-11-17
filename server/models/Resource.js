import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    details: String,
    available: { type: Boolean, default: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", ResourceSchema);
