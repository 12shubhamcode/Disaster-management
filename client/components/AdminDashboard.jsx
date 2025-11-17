import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState({ alerts: true, reports: true });
  const [error, setError] = useState({ alerts: null, reports: null });
  const [deletingId, setDeletingId] = useState(null);

  // Fetch existing alerts + reports
  useEffect(() => {
    setLoading({ alerts: true, reports: true });

    API.get("/reports")
      .then((r) => setReports(r.data))
      .catch(() =>
        setError((e) => ({ ...e, reports: "Failed to load reports" }))
      )
      .finally(() => setLoading((l) => ({ ...l, reports: false })));

    API.get("/alerts")
      .then((r) => setAlerts(r.data))
      .catch(() => setError((e) => ({ ...e, alerts: "Failed to load alerts" })))
      .finally(() => setLoading((l) => ({ ...l, alerts: false })));
  }, []);

  async function addAlert(e) {
    e.preventDefault();
    setMessage("");
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

  async function deleteAlert(id) {
    if (!window.confirm("Are you sure you want to delete this alert?")) return;
    setDeletingId(id);
    setMessage("");
    try {
      await API.delete(`/alerts/${id}`);
      setMessage(" Alert deleted");
      setAlerts((prev) => prev.filter((a) => a._id !== id));
    } catch {
      setMessage("Failed to delete alert");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-20">
      <h1 className="text-2xl font-bold mb-4"> Admin Dashboard</h1>

      {message && (
        <p className="text-center text-sm text-blue-600 mb-2">{message}</p>
      )}

      {/* Manage Alerts */}
      <section className="mb-8">
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
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading.alerts}
          >
            {loading.alerts ? "Posting..." : "Post Alert"}
          </button>
        </form>
      </section>

      {/* Existing Alerts */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📢 Current Alerts</h2>
        {loading.alerts ? (
          <p className="text-gray-500">Loading alerts...</p>
        ) : error.alerts ? (
          <p className="text-red-500">{error.alerts}</p>
        ) : alerts.length === 0 ? (
          <p className="text-gray-400">No alerts posted yet.</p>
        ) : (
          <div className="space-y-2">
            {alerts.map((a) => (
              <div
                key={a._id}
                className="border-l-4 border-red-500 bg-slate-100 p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-sm text-gray-700">{a.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  className="ml-4 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  onClick={() => deleteAlert(a._id)}
                  disabled={deletingId === a._id}
                  title="Delete Alert"
                >
                  {deletingId === a._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reports Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-2">📝 Recent Reports</h2>
        {loading.reports ? (
          <p className="text-gray-500">Loading reports...</p>
        ) : error.reports ? (
          <p className="text-red-500">{error.reports}</p>
        ) : reports.length === 0 ? (
          <p className="text-gray-400">No reports submitted yet.</p>
        ) : (
          <div className="space-y-2">
            {reports.map((r) => (
              <div key={r._id} className="border p-3 rounded bg-slate-50">
                <p className="font-medium">{r.type}</p>
                <p className="text-sm text-gray-600">{r.description}</p>

                {/* FIX: Convert location object to readable text */}
                <p className="text-xs text-gray-400">
                  {typeof r.location === "object"
                    ? `${r.location.lat}, ${r.location.lng}`
                    : r.location}
                  {" — "}
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
