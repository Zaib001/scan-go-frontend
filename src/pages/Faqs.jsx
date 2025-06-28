import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "Do I need an app to use the audio guide?",
    answer: "No app is required. Just scan the QR code and the audio plays directly in the browser.",
  },
  {
    question: "Is internet required during the visit?",
    answer: "Internet is only needed initially. If downloaded, audio works offline without interruption.",
  },
  {
    question: "Can I customize the audio for my venue?",
    answer: "Yes, we offer full customization, including branding, language support, and voice options.",
  },
  {
    question: "Is the system suitable for outdoor exhibits?",
    answer: "Absolutely. Our guides are optimized for both indoor and outdoor environments.",
  },
];

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const toggleFAQ = (idx) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));

    // Scroll into view smoothly
    setTimeout(() => {
      const el = document.getElementById(`faq-${idx}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Glow Effects */}
      <div className="absolute -top-20 left-0 h-64 w-64 bg-indigo-500 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-0 h-64 w-64 bg-indigo-400 opacity-20 blur-3xl rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="w-full border-t border-indigo-500 relative z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 px-4 text-indigo-300 text-sm font-semibold tracking-wider uppercase">
            FAQs
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mt-4">
          Frequently Asked Questions
        </h2>
        <p className="text-indigo-200/70 mt-2 max-w-xl mx-auto">
          Everything you need to know before you start using Scan & Go.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-6" data-aos="fade-up" ref={containerRef}>
        {faqs.map((item, idx) => (
          <div
            key={idx}
            id={`faq-${idx}`}
            className="border border-indigo-500/30 bg-gray-800 rounded-lg transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex items-center justify-between text-left px-5 py-4 text-white font-medium text-lg"
            >
              {item.question}
              {activeIndex === idx ? (
                <FaChevronUp className="text-indigo-400" />
              ) : (
                <FaChevronDown className="text-indigo-400" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === idx && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-4 text-indigo-300 text-sm overflow-hidden"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
