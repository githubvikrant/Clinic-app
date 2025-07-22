import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const { isAuthenticated, admin } = useContext(Context);

  const fullName = admin
    ? `${admin.firstName || "Doctor"} ${admin.lastName || ""}`.trim()
    : "Doctor";

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/getall`,
          { withCredentials: true }
        );
        const sorted = data.appointments.sort((a, b) => {
          const order = { Pending: 0, Accepted: 1, Rejected: 2 };
          return order[a.status] - order[b.status];
        });
        setAppointments(sorted);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch appointments");
      }
    })();
  }, []);

  const confirmStatusChange = (id, status) => {
    setSelectedId(id);
    setSelectedStatus(status);
    setShowConfirm(true);
  };

  const handleUpdateStatus = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/update/${selectedId}`,
        { status: selectedStatus },
        { withCredentials: true }
      );
      toast.success(data.message || "Status updated");

      setAppointments((prev) =>
        [...prev].map((a) =>
          a._id === selectedId ? { ...a, status: selectedStatus } : a
        ).sort((a, b) => {
          const order = { Pending: 0, Accepted: 1, Rejected: 2 };
          return order[a.status] - order[b.status];
        })
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
      setSelectedStatus(null);
    }
  };

  const getStatusClass = (status) => {
    return {
      Accepted: "border-green-500 text-green-400",
      Rejected: "border-red-500 text-red-500 font-semibold",
      Pending: "border-yellow-400 text-yellow-300",
    }[status] || "";
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="bg-black text-white min-h-screen p-4">
      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow text-center max-w-md w-full">
            <h3 className="text-xl mb-4">
              Are you sure you want to mark this appointment as{" "}
              <span className="font-bold text-blue-400">{selectedStatus}</span>?
            </h3>
            <div className="flex justify-center gap-6">
              <button
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                onClick={handleUpdateStatus}
              >
                Yes
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-500">Dashboard</h1>
      </div>

      {/* Greeting */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-blue-900 to-black border border-blue-800 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex gap-4 items-center col-span-2">
          <img src="/doc.png" alt="Doctor" className="w-20 h-20 rounded-full" />
          <div>
            <p className="text-gray-400">Hello,</p>
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-gray-400 text-sm">
              Welcome to your appointment manager dashboard.
            </p>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-md text-center shadow hover:scale-105 transition">
          <p className="text-white font-medium">Total Appointments</p>
          <h3 className="text-3xl font-bold text-green-400">{appointments.length}</h3>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-lg overflow-auto">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Appointments</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-800 text-blue-300">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Phone No</th>
              <th className="p-3 text-left">Symptoms</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((a) => (
                <tr key={a._id} className="hover:bg-zinc-800 transition">
                  <td className="p-3">{a.firstName} {a.lastName}</td>
                  <td className="p-3">
                    {a.appointment_date
                      ? new Date(a.appointment_date).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="p-3">{a.phone || "N/A"}</td>
                  <td className="p-3">{a.symptoms || "N/A"}</td>
                  <td className="p-3">
                    <select
                      value={a.status}
                      onChange={(e) => confirmStatusChange(a._id, e.target.value)}
                      className={`px-2 py-1 rounded bg-black border focus:outline-none ${getStatusClass(a.status)} hover:scale-105 transition-all`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-6">
                  No Appointments Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
