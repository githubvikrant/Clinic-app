import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
    { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
    { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
    { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
    { name: "Oncology", imageUrl: "/departments/onco.jpg" },
    { name: "Radiology", imageUrl: "/departments/radio.jpg" },
    { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
    { name: "Dermatology", imageUrl: "/departments/derma.jpg" },
    { name: "ENT", imageUrl: "/departments/ent.jpg" },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Departments</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        showDots={false}
      >
        {departmentsArray.map((depart, index) => (
          <div
            key={index}
            className="mx-3 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={depart.imageUrl}
              alt={depart.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-blue-700">{depart.name}</h3>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Departments;
