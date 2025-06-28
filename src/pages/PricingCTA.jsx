import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PricingCTA() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Glowing Effects */}
      <div className="absolute top-0 left-0 h-64 w-64 bg-indigo-500 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-64 w-64 bg-indigo-400 opacity-20 blur-3xl rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20">
        <div className="w-full border-t border-indigo-500 relative z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 px-4 text-indigo-300 text-sm font-semibold tracking-wider uppercase">
            Pricing
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mt-4">
          Simple & Transparent Pricing
        </h2>
        <p className="text-indigo-200/70 mt-2 max-w-xl mx-auto">
          Start free or upgrade as you grow — built for museums, galleries, and events of all sizes.
        </p>
      </div>

      {/* Pricing Card */}
      <div
        className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-indigo-500/30 rounded-2xl p-10 max-w-2xl mx-auto shadow-xl"
        data-aos="fade-up"
      >
        <div className="flex items-start gap-5">
          {/* Icon */}
          <div className="flex-shrink-0 bg-indigo-600 p-3 rounded-full">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 8c-1.104 0-2-.672-2-1.5S10.896 5 12 5s2 .672 2 1.5S13.104 8 12 8Zm0 2c2.5 0 5 1.172 5 3.5V16H7v-2.5c0-2.328 2.5-3.5 5-3.5Z" />
            </svg>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Starter Plan</h3>
            <p className="text-indigo-300 mb-4 text-sm leading-relaxed">
              Includes up to 50 exhibits, offline mode, and multi-language support.
            </p>
            <div className="text-4xl font-bold text-white mb-6">
              $29<span className="text-base font-medium text-indigo-300">/month</span>
            </div>
            <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition">
              Start Now
            </button>
          </div>
        </div>
      </div>

      {/* CTA Text */}
      <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="200">
        <p className="text-indigo-300 mb-4">Want a personalized tour for your space?</p>
        <button className="btn bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-2 rounded-md transition">
          Schedule Demo
        </button>
      </div>
    </section>
  );
}
