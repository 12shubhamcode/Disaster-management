import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For hamburger icons

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // Get user details
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); //clear user info on logout
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="font-extrabold text-xl text-blue-600 hover:text-blue-700 transition-colors"
        >
          Disaster<span className="text-gray-800">Management</span>
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <Link
                to="/resources"
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Resources
              </Link>

              <Link
                to="/report"
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Report
              </Link>

              {/* SHOW ADMIN ONLY IF role === "admin" */}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Admin Panel
                </Link>
              )}

              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t animate-slide-down">
          <div className="flex flex-col p-4 space-y-2">
            {token ? (
              <>
                <Link
                  to="/resources"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Resources
                </Link>

                <Link
                  to="/report"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Report
                </Link>

                {/* MOBILE ADMIN LINK */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    Admin Panel
                  </Link>
                )}

                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
