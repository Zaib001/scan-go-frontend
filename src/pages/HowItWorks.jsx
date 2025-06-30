import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HowItWorks() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const steps = [
    {
      title: "Scan the QR Code",
      description: "Visitors scan a QR code placed near exhibits using their phone camera.",
    },
    {
      title: "Audio Guide Starts",
      description: "Audio starts automatically in the selected language — no app needed.",
    },
    {
      title: "Explore More",
      description: "Users move to the next exhibit and repeat the scan to learn more.",
    },
    {
      title: "Offline Mode",
      description: "Once downloaded, the audio remains accessible without internet.",
    },
  ];

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto bg-white">
      {/* Gradient Glows */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-300 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-64 w-64 bg-purple-200 opacity-20 blur-3xl rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20">
        <div className="w-full border-t border-gray-300 relative z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-black text-sm font-semibold tracking-wider uppercase">
            How It Works
          </div>
        </div>
        <p className="mt-4 text-gray-500">
          A simple and intuitive journey for every visitor.
        </p>
      </div>

      {/* Zigzag Timeline */}
      <div className="relative border-l border-gray-300 pl-8 space-y-16 before:absolute before:left-1 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-black before:to-purple-300">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative group"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            {/* Step Number */}
            <div className="absolute -left-[1.3rem] top-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shadow-md">
              {idx + 1}
            </div>

            {/* Step Content */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition duration-300 group-hover:scale-[1.015]">
              <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
