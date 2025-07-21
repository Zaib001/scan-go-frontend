import React, { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { createPortal } from "react-dom";

// Helper to detect YouTube links
const isYouTubeLink = (url) =>
  url.includes("youtube.com") || url.includes("youtu.be");

export default function ModalVideo({
  videoSrc,
  thumb,
  alt,
  isOpen: externalIsOpen,
  onClose,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const videoRef = useRef(null);

  const isControlled = typeof externalIsOpen === "boolean";
  const isOpen = isControlled ? externalIsOpen : internalOpen;

  const handleClose = isControlled
    ? () => {
      if (videoRef.current) videoRef.current.pause?.();
      onClose();
    }
    : () => {
      if (videoRef.current) videoRef.current.pause?.();
      setInternalOpen(false);
    };

  const handleOpen = () => {
    if (!isControlled) setInternalOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const renderVideoPlayer = () => {
    if (isYouTubeLink(videoSrc)) {
      const embedURL = videoSrc.includes("embed")
        ? videoSrc
        : `https://www.youtube.com/embed/${videoSrc.split("/").pop()}?autoplay=1&rel=0`;

      return (
        <iframe
          src={embedURL}
          title="Demo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-2xl"
        ></iframe>
      );
    } else {
      return (
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          controls
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain rounded-lg"
        />
      );
    }
  };

  const modalContent = (
    <>
      {thumb && (
        <button
          className="group relative flex items-center justify-center rounded-xl overflow-hidden mx-auto max-w-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
          onClick={handleOpen}
          aria-label="Watch the demo"
        >
          <img src={thumb} alt={alt} className="w-full h-auto object-cover" />
          <div className="absolute inset-0 flex items-center justify-center group-hover:bg-opacity-50 transition">
            <div className="bg-white text-black p-4 rounded-full shadow-lg">
              <FaPlay className="w-6 h-6" />
            </div>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl">
            {renderVideoPlayer()}
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full p-2 hover:text-red-400 z-50"
              onClick={handleClose}
              aria-label="Close Video"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );

  return createPortal(modalContent, document.body);
}
