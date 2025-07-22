import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useContext, useState } from "react";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        { email, password, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res?.data?.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="pt-24 px-4 min-h-screen flex items-center justify-center  ">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-800 mb-2">
          Sign In
        </h2>
        <p className="text-sm sm:text-base text-center text-gray-600 mb-6">
          Please Login To Continue
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex justify-end items-center gap-2 text-sm">
            <span className="text-gray-600">Not Registered?</span>
            <Link to="/register" className="text-purple-700 font-medium hover:underline">
              Register Now
            </Link>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
