import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function ModalVideo({ videoSrc, thumb, alt, isOpen: externalIsOpen, onClose }) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = typeof externalIsOpen === "boolean";
  const isOpen = isControlled ? externalIsOpen : internalOpen;
  const handleClose = isControlled ? onClose : () => setInternalOpen(false);
  const handleOpen = () => {
    if (!isControlled) setInternalOpen(true);
  };

  return (
    <>
      {/* Optional Thumbnail Trigger Mode */}
      {thumb && (
        <button
          className="group relative flex items-center justify-center rounded-xl overflow-hidden mx-auto max-w-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
          onClick={handleOpen}
          aria-label="Watch the demo"
        >
          <img
            src={thumb}
            alt={alt}
            className="w-full h-auto object-cover"
          />
          {/* Play Icon Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition">
            <div className="bg-white text-black p-4 rounded-full shadow-lg">
              <FaPlay className="w-6 h-6" />
            </div>
          </div>
        </button>
      )}

      {/* Modal Video */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={videoSrc}
              title="Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-2xl"
            ></iframe>

            {/* Close Button */}
            <button
              className="absolute -top-1 right-2 text-white text-3xl font-bold hover:text-red-400"
              onClick={handleClose}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
