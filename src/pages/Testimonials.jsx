import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Updated testimonials with new names, businesses, and images
const testimonials = [
  {
    name: "Alice Johnson",
    company: "Global Museum",
    quote:
      "This system has transformed our museum's visitor experience. The audio guides are incredibly user-friendly!",
    image: "https://i.pravatar.cc/100?img=9",
  },
  {
    name: "Robert Miller",
    company: "Visionary Arts",
    quote:
      "We saw an immediate increase in engagement after implementing Scan Me AI. The multilingual options are a huge plus.",
    image: "https://i.pravatar.cc/100?img=8",
  },
  {
    name: "Mia Rodriguez",
    company: "Future Exhibits",
    quote:
      "The QR scan feature is a game-changer. It’s seamless, and our visitors love the convenience of it.",
    image: "https://i.pravatar.cc/100?img=7",
  },
  {
    name: "John Davis",
    company: "Heritage Expeditions",
    quote:
      "The offline feature is fantastic for our outdoor exhibits. It’s great to offer visitors the option to enjoy the audio anytime.",
    image: "https://i.pravatar.cc/100?img=12",
  },
];

export default function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 h-56 w-56 bg-indigo-300 opacity-20 blur-3xl rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 h-56 w-56 bg-purple-300 opacity-20 blur-3xl rounded-full pointer-events-none z-0" />

      {/* Section Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="w-full border-t border-gray-300 relative z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-black text-sm font-semibold tracking-wider uppercase">
            Testimonials
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
          What Our Partners Say
        </h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Hear directly from those using our system in real-world settings.
        </p>
      </div>

      {/* Testimonial Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 relative z-10">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full border-2 border-indigo-400"
              />
              <div>
                <h4 className="text-gray-900 font-semibold">{t.name}</h4>
                <span className="text-sm text-black">{t.company}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">“{t.quote}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
