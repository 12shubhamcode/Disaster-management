import React, { useState } from "react";
import API from "../services/api";

export default function ReportForm() {
  const [type, setType] = useState("medical");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    try {
      await API.post("/reports", {
        type,
        description,
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
      });
      setMsg({ text: "Report submitted successfully!", type: "success" });
      setDescription("");
      setLat("");
      setLng("");
    } catch (e) {
      setMsg({ text: "Failed to submit report. Try again.", type: "error" });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h3 className="text-2xl font-bold text-blue-700 text-center">
          Submit Emergency Report
        </h3>
        <p className="text-slate-600 text-center mt-2">
          Provide the details of the emergency so responders can act quickly.
        </p>

        <form onSubmit={submit} className="space-y-4 mt-6">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Type of Emergency
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="medical">🚑 Medical</option>
              <option value="fire">🔥 Fire</option>
              <option value="rescue">🆘 Rescue</option>
              <option value="flood">🌊 Flood</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the situation..."
              rows={3}
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            />
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Latitude
              </label>
              <input
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="e.g. 37.7749"
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Longitude
              </label>
              <input
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="e.g. -122.4194"
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
          >
            🚨 Send Report
          </button>

          {/* Feedback Message */}
          {msg && (
            <div
              className={`mt-3 text-center text-sm font-medium ${
                msg.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {msg.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
