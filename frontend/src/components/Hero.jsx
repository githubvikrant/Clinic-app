
const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Welcome to Patna Homeopathic Clinic, where holistic healing meets compassionate care. Nestled in the heart of the vibrant city of Patna, our clinic is dedicated to providing top-notch homeopathic treatments for a wide range of health conditions. Whether you are seeking alternative medicine for chronic ailments or looking for natural remedies to complement your existing healthcare regimen, our clinic offers a warm and welcoming environment for patients of all ages.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
