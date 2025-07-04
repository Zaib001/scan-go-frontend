import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaQrcode, FaHeadphones, FaCloudDownloadAlt } from "react-icons/fa";
import ModalVideo from "./ModalVideo";

export default function HowItWorks() {

  const [openVideoIndex,setOpenVideoIndex] = useState("");

  
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const steps = [
    {
      title: "Scan the QR Code",
      description: "Visitors scan our dynamic QR code placed near an item using their phone.",
      icon: <FaQrcode className="text-black w-8 h-8" />,
    },
    {
      title: "Audio Guide Starts",
      description: "Audio starts automatically in the selected language — no app needed.",
      icon: <FaHeadphones className="text-black w-8 h-8" />,
    },
    {
      title: "Offline Mode",
      description: "Offer downloadable premium content and set your own price.",
      icon: <FaCloudDownloadAlt className="text-black w-8 h-8" />,
    },
  ];

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-200 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-64 w-64 bg-purple-200 opacity-20 blur-3xl rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="w-full border-t border-gray-300 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-black text-sm font-semibold tracking-wider uppercase">
            How It Works
          </div>
        </div>
        <p className="mt-4 text-gray-500 text-lg">
          A simple and intuitive journey for every visitor.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-16 relative before:absolute before:left-4 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-black before:to-indigo-400">
        {steps.map((step, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
            className="relative pl-14 flex items-start group"
          >
            {/* Step Number */}
            <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-sm font-semibold shadow-md">
              {idx + 1}
            </div>

            {/* Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md transition-transform duration-300 group-hover:scale-[1.02] w-full">
              <div className="flex items-center gap-4 mb-3 text-black">
                {step.icon}
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Optional Video CTA */}
      <div className="text-center mt-16">
        <button
          onClick={() => setOpenVideoIndex("how-it-works")}
          className="inline-block bg-black hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition"
        >
          Watch How It Works
        </button>

        {openVideoIndex === "how-it-works" && (
          <ModalVideo
            videoSrc="https://youtu.be/tPI9c3Ys8AA"
            isOpen={true}
            onClose={() => setOpenVideoIndex(null)}
          />
        )}
      </div>

    </section>
  );
}
