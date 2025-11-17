import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    API.get("/alerts")
      .then((res) => setAlerts(res.data))
      .catch(() => {});
  }, []);

  if (!alerts.length) return null;

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-red-600">
        🚨 Active Alerts
      </h2>
      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a._id}
            className="p-3 border-l-4 border-red-500 bg-red-50 rounded-lg shadow-sm"
          >
            <p className="font-bold">{a.title}</p>
            <p>{a.description}</p>
            <p className="text-xs text-gray-500">
              {new Date(a.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
