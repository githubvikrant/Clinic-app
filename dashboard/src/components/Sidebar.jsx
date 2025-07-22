import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin/logout`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const navigation = [
    { icon: <TiHome />, action: () => navigateTo("/") },
    { icon: <FaUserDoctor />, action: () => navigateTo("/doctors") },
    { icon: <MdAddModerator />, action: () => navigateTo("/admin/addnew") },
    { icon: <IoPersonAddSharp />, action: () => navigateTo("/doctor/addnew") },
    { icon: <AiFillMessage />, action: () => navigateTo("/messages") },
    { icon: <RiLogoutBoxFill />, action: handleLogout },
  ];

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Show Menu Button only when sidebar is hidden */}
      {!show && (
        <div
          className="fixed top-5 left-5 z-50 text-blue-500 bg-black w-11 h-11 flex items-center justify-center rounded-xl text-3xl shadow-md cursor-pointer"
          onClick={() => setShow(true)}
        >
          <GiHamburgerMenu />
        </div>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-black w-20 md:w-24 flex flex-col items-center pt-24 gap-6 z-40 transition-transform duration-300 ease-in-out ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navigation.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              item.action();
              setShow(false); // Hide sidebar on item click
            }}
            className="text-white text-3xl cursor-pointer hover:bg-gray-200 hover:text-[#1e1e2f] p-3 rounded-xl transition duration-200"
          >
            {item.icon}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
