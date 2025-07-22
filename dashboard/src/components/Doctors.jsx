import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctors`,
          { withCredentials: true }
        );
        setDoctors(data.doctors || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="min-h-screen bg-gradient-to-l from-[#0f2b74] to-black p-5 md:p-10">
      <div className="container mx-auto">
        <h1 className="text-[1.8rem] sm:text-3xl md:text-[2.3rem] text-[#3939d9f2] mb-8 font-bold tracking-wide text-center sm:text-left">
          DOCTORS
        </h1>

        {loading ? (
          <div className="text-center text-xl font-semibold text-blue-700 animate-pulse">
            Loading doctors...
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-[#1d1b2f] text-white rounded-2xl shadow-2xl p-6 flex flex-col items-center relative"
              >
                <img
                  src={doc.docAvatar?.url}
                  alt="doctor avatar"
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-md"
                />
                <h4 className="mt-4 text-lg sm:text-xl font-bold tracking-wide text-center">
                  {`${doc.firstName} ${doc.lastName}`}
                </h4>

                <div className="w-full mt-3 flex flex-col gap-2 text-sm sm:text-base text-[#ccc] mb-4">
                  <p>Email: <span className="text-white break-all">{doc.email}</span></p>
                  <p>Phone: <span className="text-white">{doc.phone}</span></p>
                  <p>DOB: <span className="text-white">{doc.dob?.substring(0, 10)}</span></p>
                  <p>Department: <span className="text-white">{doc.doctorDepartment}</span></p>
                  <p>Gender: <span className="text-white">{doc.gender}</span></p>
                </div>

                <button className="absolute top-4 right-4 text-purple-400 hover:text-purple-200 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m0 14v1m8-8h1M4 12H3m15.36 6.36l.71.71M6.34 6.34l-.71-.71M18.36 5.64l.71-.71M5.64 18.36l-.71.71"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-red-600 font-medium">
            No Registered Doctors Found!
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;
