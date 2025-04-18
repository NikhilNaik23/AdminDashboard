import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          credentials: "include",
        });
        localStorage.removeItem("isAdmin"); 
        toast.success("Logged out successfully");
        navigate('/')
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="md:px-14">
      <nav className="bg-blue-900/10 h-16 w-full flex items-center justify-between px-3 shadow-md overflow-x-auto">
        <Link to={"/admin/dashboard"}>
          <div className="flex items-center space-x-2 min-w-fit sm:text-2xl">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-white text-base font-semibold whitespace-nowrap">
              Admin Panel
            </span>
          </div>
        </Link>

        {/* Right: Links */}
        <ul className="flex items-center space-x-4 text-white text-sm font-medium min-w-fit sm:text-2xl justify-center">
          <li>
            <Link
              to="/admin/attraction"
              className="hover:text-yellow-300 transition whitespace-nowrap"
            >
              Attractions
            </Link>
          </li>
          <li>
            <Link
              to="/admin/cuisine"
              className="hover:text-yellow-300 transition whitespace-nowrap"
            >
              Cuisines
            </Link>
          </li>
          <li>
            <button onClick={logout} type="button">
              <IoIosLogOut />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
