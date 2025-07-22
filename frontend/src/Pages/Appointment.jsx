import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full overflow-x-hidden">
      <Hero
        title="Schedule Your Appointment | Patna Homoeopathic Clinic Dr Manish Mishra Medical Institute"
        imageUrl="/signin.png"
      />
      <AppointmentForm />
    </div>
  );
};

export default Appointment;
