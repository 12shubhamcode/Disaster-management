import React, { useEffect, useState } from "react";
import API from "../services/api";
import MapView from "./MapView";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    API.get("/reports")
      .then((r) => setReports(r.data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 md:p-10 mt-5">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold text-blue-700">Dashboard</h2>
          <p className="text-slate-600 mt-2 md:mt-0">
            Monitor disaster reports and view locations in real time.
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Reports Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-slate-800">
                Active Reports
              </h3>
              <span className="text-sm text-slate-500">
                Total: {reports.length}
              </span>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
              {reports.length > 0 ? (
                reports.map((r) => (
                  <div
                    key={r._id}
                    className="p-3 border rounded-lg hover:shadow transition bg-slate-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-blue-600">{r.type}</p>
                        <p className="text-slate-700 text-sm">
                          {r.description}
                        </p>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(r.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm italic text-center py-6">
                  No active reports yet.
                </p>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Map</h3>
            <div
              className="rounded-lg overflow-hidden border border-slate-200"
              style={{ height: 400 }}
            >
              <MapView reports={reports} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
