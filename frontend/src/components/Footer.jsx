import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="  text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <hr className="mb-8 border-2	 border-black" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-700 font-medium text-base">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/appointment" className="hover:underline">Appointment</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
            </ul>
          </div>

          {/* Clinic Hours */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Clinic Hours</h4>
            <div className="text-gray-700 space-y-4 text-base">
              <div>
                <strong>Mon - Sat:</strong>
                <div className="ml-4">
                  <p>Morning: 08:00 - 10:00</p>
                  <p>Evening: 04:00 - 09:00</p>
                </div>
              </div>
              <div>
                <strong>Sunday:</strong>
                <div className="ml-4">
                  <p>Evening: 04:00 - 09:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-base">
              <div className="flex items-center gap-2">
                <FaPhone className="text-blue-600" />
                <span>9472060190</span>
              </div>
              <div className="flex items-center gap-2">
                <MdEmail className="text-blue-600" />
                <span className="break-all">patnahomoeopathicclinic0907@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLocationArrow className="text-blue-600" />
                <span>Kankarbagh, Patna</span>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="h-60 rounded-xl overflow-hidden">
            <iframe
              title="Kankarbagh Map"
             src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3598.7114098548655!2d85.15151597539443!3d25.5812663774657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDM0JzUyLjYiTiA4NcKwMDknMTQuNyJF!5e0!3m2!1sen!2sin!4v1753202729315!5m2!1sen!2sin"  
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
{/* <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3598.7114098548655!2d85.15151597539443!3d25.5812663774657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDM0JzUyLjYiTiA4NcKwMDknMTQuNyJF!5e0!3m2!1sen!2sin!4v1753202729315!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}