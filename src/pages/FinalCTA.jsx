import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function FinalCTA() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Glow Effects */}
      <div className="absolute -top-20 left-0 h-64 w-64 bg-purple-500 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-0 h-64 w-64 bg-cyan-400 opacity-20 blur-3xl rounded-full pointer-events-none" />

      {/* CTA Container */}
      <div
        className="bg-gradient-to-r bg-black rounded-xl border border-white/10 shadow-xl p-12 text-center backdrop-blur-md"
        data-aos="zoom-in"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Elevate Visitor Engagement?
        </h2>
        <p className="text-indigo-200/70 mb-8 max-w-2xl mx-auto">
          Launch instant audio tours with zero hassle — beautifully crafted for museums, exhibits, and live events.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            onClick={() => {
              const section = document.getElementById("contact");
              section?.scrollIntoView({ behavior: "smooth" });
            }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Contact Form
          </a>
          <a
            onClick={() => {
              const section = document.getElementById("contact");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-indigo-100 border border-indigo-500/40 px-6 py-3 rounded-lg transition"
          >
            Schedule a Demo
          </a>

        </div>
      </div>
    </section>
  );
}
