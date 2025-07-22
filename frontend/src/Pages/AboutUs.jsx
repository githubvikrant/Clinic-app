import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full overflow-x-hidden">
      <Hero
        title="More About Us | Patna Homoeopathic Clinic Dr Manish Mishra"
        imageUrl="/about.png"
      />
      <Biography imageUrl="/whoweare.png" />
    </div>
  );
};

export default AboutUs;
