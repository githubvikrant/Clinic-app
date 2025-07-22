import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-tranparent">
      <div className="flex flex-col items-center w-full">
        <Hero
          title="Welcome to Patna Homoeopathic Clinic Dr Manish Mishra | Your Trusted Healthcare Provider"
          imageUrl="/hero.png"
        />
        <Biography imageUrl="/about.png" />
        <div className="w-full px-4 md:px-8 lg:px-16">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
