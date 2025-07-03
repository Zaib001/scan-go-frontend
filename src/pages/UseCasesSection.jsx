import { useState } from "react";
import ModalVideo from "./ModalVideo"; // Make sure path is correct
import {
  FaHospital,
  FaUniversity,
  FaPaintBrush,
  FaSeedling,
  FaBookOpen,
  FaHotel,
  FaRegBuilding,
} from "react-icons/fa";

export default function UseCasesSection({ useCases }) {
  const [openVideoIndex, setOpenVideoIndex] = useState(null);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto text-center">
        <div className="w-full border-t border-gray-300 relative z-10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-black text-sm font-semibold tracking-wider uppercase">
            Use Cases
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl p-6 transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-indigo-100 hover:transition-all duration-300 ease-in-out"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Icon Section */}
              <div className="flex justify-center items-center mb-6">
                {useCase.title === "Hospitals" && <FaHospital className="w-16 h-16 text-black hover:rotate-12" />}
                {useCase.title === "Museums" && <FaUniversity className="w-16 h-16 text-black hover:rotate-12" />}
                {useCase.title === "Art Galleries" && <FaPaintBrush className="w-16 h-16 text-black hover:rotate-12" />}
                {useCase.title === "Garden Centres" && <FaSeedling className="w-16 h-16 text-black hover:rotate-12" />}
                {useCase.title === "Education" && <FaBookOpen className="w-16 h-16 text-black hover:rotate-12" />}
                {useCase.title === "Tourism - Hotels & Attractions" && <FaHotel className="w-16 h-16 text-black hover:rotate-12" />}
                {useCase.title === "Local Councils" && <FaRegBuilding className="w-16 h-16 text-black hover:rotate-12" />}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-semibold text-black mb-4 hover:text-indigo-600 transition">
                {useCase.title}
              </h3>
              <p className="text-gray-600 text-lg mb-4">{useCase.description}</p>

              {/* Watch Video Button */}
              <button
                onClick={() => setOpenVideoIndex(index)}
                className="inline-block text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition"
              >
                Watch video
              </button>

              {/* Modal Lightbox for Video */}
              {openVideoIndex === index && (
                <ModalVideo
                  videoSrc={useCase.videoLink.replace("youtu.be/", "www.youtube.com/embed/") + "?autoplay=1"}
                  thumb=""
                  alt={useCase.title}
                  onClose={() => setOpenVideoIndex(null)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
