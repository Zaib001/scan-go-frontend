import React from "react";

export default function UseCaseModalVideo({ videoSrc, isOpen, onClose, thumb, alt }) {
  if (!isOpen) return null;

  return (
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
          className="absolute -top-6 right-0 text-white text-3xl font-bold hover:text-red-400"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
