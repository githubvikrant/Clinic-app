import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import AddNewAdmin from "./components/AddNewAdmin";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Check backend connection
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/ping`
        );
        console.log("✅ Backend connected:", response.data.message);
      } catch (error) {
        console.error("❌ Failed to connect to backend:", error.message);
      }
    };
    checkBackend();
  }, []);

  // Fetch authenticated admin
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin/me`,
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="flex bg-black">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 min-h-screen  md:ml">
          {/* Show menu icon on mobile */}
          

          <main className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/doctor/addnew" element={<AddNewDoctor />} />
              <Route path="/admin/addnew" element={<AddNewAdmin />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/doctors" element={<Doctors />} />
            </Routes>
          </main>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
