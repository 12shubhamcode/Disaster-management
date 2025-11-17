import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");

  // Fetch existing alerts + reports
  useEffect(() => {
    API.get("/reports")
      .then((r) => setReports(r.data))
      .catch(() => {});
    API.get("/alerts")
      .then((r) => setAlerts(r.data))
      .catch(() => {});
  }, []);

  async function addAlert(e) {
    e.preventDefault();
    try {
      await API.post("/alerts", newAlert);
      setMessage("Alert Posted!");
      setNewAlert({ title: "", description: "" });
      const updated = await API.get("/alerts");
      setAlerts(updated.data);
    } catch {
      setMessage("Failed to post alert");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-20">
      <h1 className="text-2xl font-bold mb-4">🧭 Admin Dashboard</h1>

      {message && (
        <p className="text-center text-sm text-green-600">{message}</p>
      )}

      {/* Manage Alerts */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🚨 Post a New Alert</h2>
        <form
          onSubmit={addAlert}
          className="flex flex-col gap-3 bg-slate-50 p-4 rounded-lg"
        >
          <input
            type="text"
            placeholder="Alert Title"
            value={newAlert.title}
            onChange={(e) =>
              setNewAlert({ ...newAlert, title: e.target.value })
            }
            className="border rounded p-2"
            required
          />
          <textarea
            placeholder="Alert Description"
            value={newAlert.description}
            onChange={(e) =>
              setNewAlert({ ...newAlert, description: e.target.value })
            }
            className="border rounded p-2"
            required
          />
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Post Alert
          </button>
        </form>
      </section>

      {/* Existing Alerts */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📢 Current Alerts</h2>
        <div className="space-y-2">
          {alerts.map((a) => (
            <div
              key={a._id}
              className="border-l-4 border-red-500 bg-slate-100 p-3 rounded"
            >
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-gray-700">{a.description}</p>
              <p className="text-xs text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reports Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-2"> Recent Reports</h2>
        <div className="space-y-2">
          {reports.map((r) => (
            <div key={r._id} className="border p-3 rounded bg-slate-50">
              <p className="font-medium">{r.type}</p>
              <p className="text-sm text-gray-600">{r.description}</p>
              <p className="text-xs text-gray-400">
                {r.location} — {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
