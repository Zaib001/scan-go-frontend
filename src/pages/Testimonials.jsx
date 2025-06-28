import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Dummy testimonials
const testimonials = [
  {
    name: "Emily Carter",
    company: "National History Museum",
    quote:
      "This audio guide system is a game-changer. Visitors love the instant access and multi-language support!",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "James Thompson",
    company: "ArtVision Gallery",
    quote:
      "Super simple setup, and our international visitors really appreciate the offline functionality.",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Sofia Lopez",
    company: "Tech Explorers",
    quote:
      "An amazing tool for exhibitions. The QR scan to audio is seamless and very intuitive for users.",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Liam Nguyen",
    company: "Heritage Tours",
    quote:
      "We were up and running in a day. Excellent support and great value for our museum tours.",
    image: "https://i.pravatar.cc/100?img=4",
  },
];

export default function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 h-56 w-56 bg-indigo-500 opacity-20 blur-3xl rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 h-56 w-56 bg-indigo-400 opacity-20 blur-3xl rounded-full pointer-events-none z-0" />

      {/* Section Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="w-full border-t border-indigo-500 relative z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 px-4 text-indigo-300 text-sm font-semibold tracking-wider uppercase">
            Testimonials
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mt-4">
          What Our Partners Say
        </h2>
        <p className="text-indigo-200/70 mt-2 max-w-xl mx-auto">
          Hear directly from those using our system in real-world settings.
        </p>
      </div>

      {/* Testimonial Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 relative z-10">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-gray-800 border border-indigo-500/20 rounded-xl p-6 shadow-lg hover:shadow-indigo-600/30 transition"
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
                <h4 className="text-white font-semibold">{t.name}</h4>
                <span className="text-sm text-indigo-300">{t.company}</span>
              </div>
            </div>
            <p className="text-indigo-200/80 text-sm">“{t.quote}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
