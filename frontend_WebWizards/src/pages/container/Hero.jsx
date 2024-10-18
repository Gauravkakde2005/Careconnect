import React from "react";
// import hero from "../../assets/heroww.jpeg";\
import hero from "../../assets/Hero1.png";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="lg:ml-10 container mx-auto flex flex-col-reverse lg:px-10 px-4 py-5 lg:flex-row overflow-x-hidden">
      <div className="mt-24 lg:w-1/2">
        <h1 className="font-roboto text-3xl md:text-5xl lg:text-4xl xl:text-5xl text-center font-bold text-dark-soft lg:text-left lg:max-w-[700px]">
          Digital Health Care System
        </h1>
        <p className="text-dark-light mt-6 text-center md:text-xl lg:text-base xl:text-xl lg:text-left lg:max-w-[600px]">
          Welcome to CareConnect, your secure online platform for
          storing and sharing medical records with doctors. Easily manage your
          health information while enhancing communication and coordination with
          your healthcare team. Take control of your healthcare journey with
          confidence, knowing your data is protected and accessible whenever you
          need it.
        </p>

        <div className="mt-6 flex items-center lg:justify-start justify-center">
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-lg font-semibold text-white hover:bg-black/80"
            onClick={() => navigate("/container/profile")}
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-2 h-4 w-4"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="lg:w-1/2">
        <img className="w-full" src={hero} alt="Hero Image" />
      </div>
    </section>
  );
};
