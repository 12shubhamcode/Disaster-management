import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import ReportForm from "../components/ReportForm";
import Dashboard from "../components/Dashboard";
import AdminDashboard from "../components/AdminDashboard";
import ResourceList from "../components/ResourceList";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/resources" element={<ResourceList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/admin"
            element={
              JSON.parse(localStorage.getItem("user"))?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <h1 className="text-center text-red-600 mt-20 text-xl">
                  Access Denied
                </h1>
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}
