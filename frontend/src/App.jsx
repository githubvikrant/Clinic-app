import { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import ScrollToTop from "./ScrollToTop.js";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import WhatsAppButton from "./components/WhatsAppButton.jsx";


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);


  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/ping`,
          `http://localhost:8000/api/v1/ping`
        );
        console.log("✅ Backend connected:", response.data.message);
      }
      catch (error) {
        toast.error("Backend not connected");
      }

    };

    checkBackend();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/patient/me",
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/me`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        // Handle 401 gracefully (not a real error if user is just not logged in)
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          setUser({});
        } else {
          toast.error("Something went wrong while fetching user session");
        }
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUser]);


  return (
    <>
      <div className="bg-gradient-to-b from-cyan-100 to-cyan-200">
        <ToastContainer position="top-center" />
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <WhatsAppButton />
          <Footer />

        </Router>
      </div>

    </>
  );
};

export default App;