import { useState } from "react";
import ModalVideo from "./ModalVideo";

export default function Hero() {
    const [isOpen, setIsOpen] = useState(false);

    return (

        <section className="relative">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-36 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-2xl bg-indigo-500 opacity-30 blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500 opacity-20 blur-2xl rounded-full animate-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 opacity-20 blur-2xl rounded-full animate-none" />
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-20 md:pt-40 md:pb-24">
                    {/* Hero Text */}
                    <div className="pb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-gray-300 via-indigo-300 to-gray-100 bg-clip-text text-transparent animate-[gradient_6s_linear_infinite]">
                            Scan, Listen, and Explore — Instantly
                        </h1>
                        <p className="mt-6 text-lg text-indigo-200/70 max-w-2xl mx-auto">
                            Transform any museum, gallery, or product showcase into an immersive audio-guided experience with just a QR code scan.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex justify-center flex-wrap gap-4">
                            <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white">
                                Start Building
                            </button>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="btn bg-gray-800 hover:bg-gray-700 text-gray-300"
                            >
                                Schedule Demo
                            </button>
                        </div>
                    </div>

                    {/* Modal Video Preview */}
                    <ModalVideo
                        thumb="https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0"
                        videoSrc="/videos/video.mp4"
                        alt="Scan & Go demo"
                    />
                </div>
            </div>
        </section>
    );
}
