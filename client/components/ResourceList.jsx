import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function ResourceList() {
  const [resources, setResources] = useState([]);
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [msg, setMsg] = useState(null);

  async function fetchResources() {
    try {
      const res = await API.get("/resources");
      setResources(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addResource(e) {
    e.preventDefault();
    try {
      await API.post("/resources", { type, details });
      setMsg({ text: "Resource added successfully!", type: "success" });
      setType("");
      setDetails("");
      fetchResources();
    } catch (e) {
      setMsg({ text: "Failed to add resource.", type: "error" });
    }
  }

  async function toggleAvailability(id) {
    try {
      await API.patch(`/resources/${id}/toggle`);
      fetchResources();
    } catch (e) {
      console.error("Failed to toggle resource", e);
    }
  }

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-6 mt-5">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-3xl font-bold text-blue-700">
            Available Resources
          </h2>
          <p className="text-slate-600 mt-2 sm:mt-0">
            Manage and update emergency response resources in real time.
          </p>
        </div>

        {/* Add Resource Form */}
        <form
          onSubmit={addResource}
          className="bg-slate-50 p-4 rounded-xl mb-6 grid md:grid-cols-3 gap-3 border border-slate-200"
        >
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Resource Type (e.g. Ambulance)"
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Details (e.g. 2 drivers, medical kit)"
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium rounded-lg px-5 py-3 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
          >
            ➕ Add Resource
          </button>
        </form>

        {/* Feedback Message */}
        {msg && (
          <div
            className={`mb-4 text-sm font-medium ${
              msg.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg.text}
          </div>
        )}

        {/* Resource List */}
        <div className="space-y-3">
          {resources.length > 0 ? (
            resources.map((r) => (
              <div
                key={r._id}
                className="border border-slate-200 rounded-xl p-4 flex justify-between items-center hover:shadow transition"
              >
                <div>
                  <p className="font-semibold text-blue-700">{r.type}</p>
                  <p className="text-sm text-slate-600">{r.details}</p>
                </div>
                <button
                  onClick={() => toggleAvailability(r._id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                    r.available
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-400 hover:bg-gray-500 text-white"
                  }`}
                >
                  {r.available ? "Available" : "Unavailable"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 italic py-6">
              No resources found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
