import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/register`,
        { firstName, lastName, email, phone, dob, gender, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigateTo("/");

      // Reset
      setFirstName(""); setLastName(""); setEmail(""); setPhone("");
      setDob(""); setGender(""); setPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed.");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="pt-28 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-purple-800 mb-2">Sign Up</h2>
        <p className="text-center text-gray-600 mb-6">Please Sign Up To Continue</p>

        <form onSubmit={handleRegistration} className="space-y-4">
          {/* First + Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="First Name" value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <input type="text" placeholder="Last Name" value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Email + Phone */}
          <div className="flex flex-col md:flex-row gap-4">
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <input type="number" placeholder="Mobile Number" value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* DOB */}
          <div>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Gender + Password */}
          <div className="flex flex-col md:flex-row gap-4">
            <select value={gender} onChange={(e) => setGender(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Already Registered Link */}
          <div className="flex justify-end items-center gap-2">
            <p className="text-sm text-gray-600">Already Registered?</p>
            <Link to="/signin" className="text-sm text-purple-700 font-semibold hover:underline">Login Now</Link>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
