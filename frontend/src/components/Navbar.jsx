import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      setShowMenu(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavigate = (path) => {
    setShowMenu(false);
    navigate(path);
  };

  return (
    <nav className=" shadow-md z-50 relative">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-24 sm:w-28" />
        </Link>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-3xl text-gray-700 cursor-pointer"
          onClick={toggleMenu}
        >
          <GiHamburgerMenu />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-base font-medium">
          <Link to="/" className="text-black text-1xl hover:text-blue-700 transition">Home</Link>
          <Link to="/appointment" className="text-black text-1xl hover:text-blue-700 transition">Appointment</Link>
          <Link to="/about" className="text-black hover:text-blue-600 transition">About Us</Link>

          {isAuthenticated ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          ) : (
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleNavigate("/login")}
            >
              LOGIN
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-lg absolute top-full left-0 w-full border-t border-black z-40">
          <Link to="/" onClick={() => handleNavigate("/")} className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/appointment" onClick={() => handleNavigate("/appointment")} className="block text-gray-700 hover:text-blue-600">Appointment</Link>
          <Link to="/about" onClick={() => handleNavigate("/about")} className="block text-gray-700 hover:text-blue-600">About Us</Link>

          {isAuthenticated ? (
            <button
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          ) : (
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleNavigate("/login")}
            >
              LOGIN
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
