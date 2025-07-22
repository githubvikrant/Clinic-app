import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/send`,
        { firstName, lastName, email, phone, message },
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
      setMessage("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Message failed");
    }
  };

  return (
    <section className="px-4 py-16   relative">
      <div className="max-w-4xl mx-auto bg-white     p-8 rounded-xl shadow-md relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Send Us A Message
        </h2>
        <form onSubmit={handleMessage} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <textarea
            rows={6}
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
            required
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <img
        src="/Vector.png"
        alt="vector"
        className="absolute right-4 bottom-4 w-28 opacity-40 pointer-events-none z-0"
      />
    </section>
  );
};

export default MessageForm;
