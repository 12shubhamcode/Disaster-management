import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import API from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        if (!token) return;

        const res = await API.get("/auth/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to load user", err);
      }
    }

    fetchUser();
  }, [token]);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="font-extrabold text-xl text-blue-600 hover:text-blue-700 transition-colors"
        >
          Disaster<span className="text-gray-800">Management</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <Link
                to="/resources"
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Resources
              </Link>

              <Link
                to="/report"
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Report
              </Link>

              {/* ALWAYS SHOW ADMIN LINK IF role = "admin" */}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Admin Panel
                </Link>
              )}

              <Link
                to="/dashboard"
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <div className="flex flex-col p-4 space-y-2">
            {token ? (
              <>
                <Link
                  to="/resources"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Resources
                </Link>

                <Link
                  to="/report"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Report
                </Link>

                {/* MOBILE VERSION OF ADMIN PANEL */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-gray-700 hover:text-blue-600"
                  >
                    Admin Panel
                  </Link>
                )}

                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
