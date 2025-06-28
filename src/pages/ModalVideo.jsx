import React, { useState, useRef } from "react";

export default function ModalVideo({ thumb, videoSrc, alt }) {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="relative">
      {/* Thumbnail Button */}
      <button
        className="group relative flex items-center justify-center rounded-2xl overflow-hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Watch the demo"
      >
        <img
          src={thumb}
          alt={alt}
          className="w-full h-auto opacity-50 grayscale object-cover rounded-2xl"
        />
        <span className="absolute flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full text-white text-sm font-medium">
          ▶ Watch Demo <span className="text-gray-400">- 3:47</span>
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl">
            <video
              ref={videoRef}
              controls
              autoPlay
              loop
              className="w-full rounded shadow-lg"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-400"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
