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
         `${import.meta.env.BACKEND_URL}/api/v1/user/patient/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      navigate("/login"); // <-- force redirect      
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };


  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleNavigateLogin = () => {
    setShowMenu(false);
    navigate("/login");
    handleToggleMenu();
  };

  return (
    <>
      <nav className="container"  >
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>

        <div className={showMenu ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to="/" className="navbarLink" onClick={handleToggleMenu}>
              Home
            </Link>
            <Link to="/appointment" onClick={handleToggleMenu}>
              Appointment
            </Link>
            <Link to="/about" onClick={handleToggleMenu}>
              About Us
            </Link>
          </div>

          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={handleNavigateLogin}>
              LOGIN
            </button>
          )}
        </div>

        <div className="hamburger" onClick={handleToggleMenu}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
