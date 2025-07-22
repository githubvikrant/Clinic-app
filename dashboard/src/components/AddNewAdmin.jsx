import { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () =>
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      password: "",
    });

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin/addnew`,
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigate("/");
      resetForm();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  const fields = [
    { name: "firstName", type: "text", placeholder: "First Name" },
    { name: "lastName", type: "text", placeholder: "Last Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "number", placeholder: "Mobile Number" },
    {
      name: "gender",
      type: "select",
      options: ["Male", "Female"],
      placeholder: "Select Gender",
    },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "dob", type: "date", placeholder: "Date of Birth" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-l from-[#0f2b74] to-black text-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 p-6 md:p-10 rounded-2xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <img src="/logo.png" alt="Logo" className="h-24 md:h-32" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-center md:text-right">
            Register a New Admin
          </h1>
        </div>

        <form
          onSubmit={handleAddNewAdmin}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {fields.map((field) =>
            field.type === "select" ? (
              <select
                key={field.name}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )
          )}

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all"
            >
              Add New Admin
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewAdmin;
