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
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Glows */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-500 opacity-20 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 h-64 w-64 bg-indigo-400 opacity-20 blur-3xl rounded-full pointer-events-none"></div>

      {/* Section Header */}
      <div className="text-center mb-20">
        <div className="w-full border-t border-indigo-500 relative z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 px-4 text-indigo-300 text-sm font-semibold tracking-wider uppercase">
            How It Works
          </div>
        </div>
        <p className="mt-4 text-indigo-200/70">
          A simple and intuitive journey for every visitor.
        </p>
      </div>

      {/* Zigzag Timeline */}
      <div className="relative border-l border-indigo-500 pl-8 space-y-16 before:absolute before:left-1 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-indigo-600 before:to-indigo-300">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative group"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            {/* Step Number */}
            <div className="absolute -left-[1.3rem] top-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold shadow-lg">
              {idx + 1}
            </div>

            {/* Step Content */}
            <div className="bg-gray-800 border border-indigo-500/20 rounded-lg p-6 shadow-sm transition duration-300 group-hover:scale-[1.015]">
              <h3 className="text-lg font-semibold text-indigo-100">{step.title}</h3>
              <p className="mt-2 text-indigo-300 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
