import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday-Saturday",
      time: "Morning 08:00 - 10:00 AM / Evening 04:00 - 09:00 PM",
    },
    {
      id: 2,
      day: "Sunday",
      time: "Evening 04:00 PM - 09:00 PM",
    },
  ];

  return (
    <footer className={"container"}>
      <hr />
      <div className="content" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <Link to={"/"}>Home</Link>
            <Link to={"/appointment"}>Appointment</Link>
            <Link to={"/about"}>About</Link>
          </ul>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ marginBottom: "12px" }}>Hours</h4>
          <div style={{ marginBottom: "8px" }}>
            <strong>Monday - Saturday:</strong><br />
            <span style={{ marginLeft: "12px" }}>Morning 08:00 - 10:00</span><br />
            <span style={{ marginLeft: "12px" }}>Evening 04:00 - 09:00</span>
          </div>
          <div>
            <strong>Sunday:</strong><br />
            <span style={{ marginLeft: "12px" }}>Evening 04:00 - 09:00</span>
          </div>
        </div>



        <div>
          <h4>Contact</h4>
          <div><FaPhone /> <span>9472060190</span></div>
          <div><MdEmail /> <span>patnahomoeopathicclinic0907@gmail.com</span></div>
          <div><FaLocationArrow /> <span>Kankarbagh, Patna</span></div>
        </div>

        {/* Map Embed */}
        <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '' }}>
          <iframe
            title="Kankarbagh Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.1234567890123!2d85.160530!3d25.593819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58c123456789%3A0xabcdef1234567890!2sKankarbagh%2C%20Patna%2C%20Bihar%20800020%2C%20India!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </footer>
  );

};

export default Footer;
