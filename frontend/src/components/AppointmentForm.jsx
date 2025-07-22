import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/post`,
        {
          firstName,
          lastName,
          email,
          phone,
          age,
          gender,
          appointment_date: appointmentDate,
          hasVisited: hasVisitedBool,
          symptoms,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAge("");
      setGender("");
      setAppointmentDate("");
      setHasVisited(false);
      setSymptoms("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full min-h-screen   flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">
          Book an Appointment
        </h2>
        <form onSubmit={handleAppointment} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-style"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-style"
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-style"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-style"
              required
            />
          </div>

          {/* Row 3 */}
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input-style w-full"
            required
          />

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-style"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="input-style"
              required
            />
          </div>

          {/* Symptoms */}
          <textarea
            rows="5"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms..."
            className="input-style w-full"
            required
          />

          {/* Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              className="w-5 h-5"
            />
            <label className="text-gray-700 font-medium">
              Have you visited before?
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Get Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
