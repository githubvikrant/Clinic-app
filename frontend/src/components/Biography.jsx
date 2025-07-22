import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className=" ">
      <section className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 px-4 py-16">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <p className="text-sm text-blue-600 uppercase tracking-wider">
            About Us
          </p>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Who We Are
          </h3>
          <p className="text-gray-700 leading-relaxed">
            At Patna Homeopathic Clinic, new patients are always welcome. The
            clinic prides itself on providing personalized care to each
            individual who walks through its doors. From the moment you step
            into our clinic, you will be greeted with warmth and respect.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our clinic is staffed with experienced and compassionate
            homeopathic practitioners who are dedicated to helping patients
            achieve optimal health and wellness. Whether you are seeking
            treatment for allergies, skin conditions, or digestive issues,
            we’re here for you.
          </p>
          <p className="text-blue-700 font-semibold text-lg">
            Healing naturally, living fully.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={imageUrl}
            alt="About our clinic"
            className="w-full max-h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Biography;
