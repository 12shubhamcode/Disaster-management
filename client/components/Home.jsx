import React from "react";
import Alerts from "./Alerts";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 md:p-10 mt-5">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-blue-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700">
            Welcome to the Disaster Management Portal
          </h1>
          <p className="mt-3 text-slate-600 text-lg max-w-2xl mx-auto">
            Stay informed, stay safe — report emergencies, view alerts, and find
            help when it matters most.
          </p>
          <div className="mt-6">
            <a
              href="/report"
              className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Report an Emergency
            </a>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Active Alerts & Updates
          </h2>
          <Alerts />
        </div>
      </div>
    </div>
  );
}
