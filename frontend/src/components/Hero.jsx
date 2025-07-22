const Hero = ({ title, imageUrl }) => {
  return (
    <section className="w-full px-4 py-16  ">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            {title}
          </h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Welcome to Patna Homeopathic Clinic, where holistic healing meets compassionate care.
            Nestled in the heart of the vibrant city of Patna, our clinic is dedicated to providing
            top-notch homeopathic treatments for a wide range of health conditions. Whether you are
            seeking alternative medicine for chronic ailments or looking for natural remedies to
            complement your existing healthcare regimen, our clinic offers a warm and welcoming
            environment for patients of all ages.
          </p>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 relative">
          <img
            src={imageUrl}
            alt="hero"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto rounded-lg shadow-lg animate-fadeIn"
          />
          <img
            src="/Vector.png"
            alt="vector"
            className="absolute -bottom-6 -right-6 w-20 md:w-24 opacity-50 hidden lg:block"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
