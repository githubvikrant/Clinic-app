import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Label = ({ title, value }) => (
  <p>
    <span className="font-semibold text-gray-600">{title}:</span> {value}
  </p>
);

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/getall`,
          { withCredentials: true }
        );
        setMessages(data?.messages?.reverse() || []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch messages");
      }
    })();
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f2b74] to-[#000000] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-10 tracking-wide">
          Inbox Messages
        </h1>

        <div className="grid gap-6">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg border border-gray-200"
              >
                <div className="space-y-2 text-gray-800">
                  <Label title="First Name" value={msg.firstName} />
                  <Label title="Last Name" value={msg.lastName} />
                  <Label title="Email" value={msg.email} />
                  <Label title="Phone" value={msg.phone} />
                  <Label title="Message" value={msg.message} />
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center text-lg text-gray-300">
              No Messages Found
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Messages;
