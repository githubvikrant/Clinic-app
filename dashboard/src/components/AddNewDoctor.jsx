import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    doctorDepartment: "",
  });

  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append("docAvatar", docAvatar);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctor/addnew`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  const departments = [
    "Pediatrics", "Homeopathy", "Orthopedics", "Cardiology",
    "Neurology", "Oncology", "Radiology", "Physical Therapy",
    "Dermatology", "ENT",
  ];

  const fields = [
    { name: "firstName", type: "text", placeholder: "First Name" },
    { name: "lastName", type: "text", placeholder: "Last Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "number", placeholder: "Phone Number" },
    { name: "dob", type: "date", placeholder: "Date of Birth" },
    {
      name: "gender",
      type: "select",
      options: ["Male", "Female"],
      placeholder: "Select Gender",
    },
    { name: "password", type: "password", placeholder: "Password" },
    {
      name: "doctorDepartment",
      type: "select",
      options: departments,
      placeholder: "Select Department",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-700 to-black text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold mb-4 text-center">WELCOME BACK!</h1>
        <p className="text-lg mb-6 text-center">
          Add a new doctor to your clinic with all necessary details.
        </p>
        <img src="/logo.png" alt="logo" className="h-32" />
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 bg-black text-white p-10 flex items-center justify-center">
        <form onSubmit={handleAddNewDoctor} className="w-full max-w-md space-y-4">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center">
            <img
              src={docAvatarPreview || "/docHolder.jpg"}
              alt="Doctor Avatar"
              className="w-32 h-32 object-cover rounded-full border-2 border-purple-500 shadow mb-4"
            />
            <label className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full cursor-pointer text-sm">
              Choose File
              <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
            </label>
          </div>

          {/* Dynamic Fields */}
          {fields.map((field) =>
            field.type === "select" ? (
              <select
                key={field.name}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-100 text-black"
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 rounded bg-gray-100 text-black"
              />
            )
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-full font-semibold mt-4"
          >
            Register New Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewDoctor;
