import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiVolume2, FiDownload, FiPlay, FiPause } from 'react-icons/fi';
import { BiQr } from 'react-icons/bi';

const DemoItemDetails = ({ item, onClose, onGenerateTTS, onGenerateQR }) => {
    console.log(item)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(-1);
    const [audioProgress, setAudioProgress] = useState(0);
    const audioRef = useRef(null);
    const textRef = useRef(null);
    const words = item.textContent ? item.textContent.split(/\s+/) : [];
    const wordTimings = useRef([]);

    // Calculate word timings (simplified - in a real app you'd get these from the TTS API)
    useEffect(() => {
        if (!item.ttsAudioUrl) return;

        // This is a simplified approach. For accurate sync, you'd need:
        // 1. Word timings from the TTS API response
        // 2. Or a more sophisticated client-side timing calculation
        const averageWordDuration = 0.3; // seconds per word (approximate)
        wordTimings.current = words.map((_, index) => index * averageWordDuration);
    }, [item.ttsAudioUrl, words]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;

        const currentTime = audioRef.current.currentTime;
        setAudioProgress((currentTime / audioRef.current.duration) * 100);

        // Find which word should be highlighted based on current time
        const currentIndex = wordTimings.current.findIndex(
            (time, index) =>
                currentTime >= time &&
                (index === wordTimings.current.length - 1 || currentTime < wordTimings.current[index + 1])
        );

        setCurrentWordIndex(currentIndex);

        // Scroll to keep the current word visible
        if (textRef.current && currentIndex >= 0) {
            const wordElements = textRef.current.querySelectorAll('.word');
            if (wordElements[currentIndex]) {
                wordElements[currentIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
        setCurrentWordIndex(-1);
        setAudioProgress(0);
    };

    const handleSeek = (e) => {
        if (!audioRef.current) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const seekPosition = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = seekPosition * audioRef.current.duration;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{item.itemName}</h2>
                            <p className="text-gray-500 mt-1">
                                Created: {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {item.description && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                                <p className="text-gray-700">{item.description}</p>
                            </div>
                        )}

                        {item.textContent && (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-medium text-gray-500">Text Content</h3>
                                    <span className="text-xs text-gray-400">
                                        {words.length} words
                                    </span>
                                </div>

                                <div
                                    ref={textRef}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-60 overflow-y-auto"
                                >
                                    {words.map((word, index) => (
                                        <span
                                            key={index}
                                            className={`word inline-block mr-2 mb-1 transition-all duration-200 ${currentWordIndex === index
                                                ? 'bg-yellow-100 text-gray-900 px-1 py-0.5 rounded'
                                                : 'text-gray-700'
                                                }`}
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* TTS Audio Section */}
                            <div className={`p-4 rounded-lg border ${item.ttsAudioUrl
                                ? 'bg-green-50 border-green-100'
                                : 'border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                } transition-all`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-full ${item.ttsAudioUrl ? 'bg-green-100' : 'bg-blue-100'
                                        }`}>
                                        <FiVolume2 className={`w-5 h-5 ${item.ttsAudioUrl ? 'text-green-600' : 'text-blue-600'
                                            }`} />
                                    </div>
                                    <h3 className="font-medium text-gray-800">
                                        {item.ttsAudioUrl ? 'TTS Audio' : 'Generate TTS'}
                                    </h3>
                                </div>

                                {item.ttsAudioUrl ? (
                                    <>
                                        <audio
                                            ref={audioRef}
                                            src={`https://scan-go-backend.onrender.com${item.ttsAudioUrl}`}
                                            onTimeUpdate={handleTimeUpdate}
                                            onEnded={handleAudioEnd}
                                            className="hidden"
                                        />

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={handlePlayPause}
                                                    className={`p-2 rounded-full ${isPlaying ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                                        }`}
                                                >
                                                    {isPlaying ? <FiPause /> : <FiPlay />}
                                                </button>

                                                <div
                                                    className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer"
                                                    onClick={handleSeek}
                                                >
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full"
                                                        style={{ width: `${audioProgress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <a
                                                href={`https://scan-go-backend.onrender.com${item.ttsAudioUrl}`}
                                                download
                                                className="inline-flex items-center text-sm text-green-600 hover:text-green-800"
                                            >
                                                <FiDownload className="mr-1" /> Download MP3
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        onClick={onGenerateTTS}
                                        className="w-full py-3 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                    >
                                        Generate Text-to-Speech
                                    </button>
                                )}
                            </div>

                            {/* QR Code Section */}
                            <div className={`p-4 rounded-lg border ${item.qrCodeUrl
                                ? 'bg-purple-50 border-purple-100'
                                : 'border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                } transition-all`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-full ${item.qrCodeUrl ? 'bg-purple-100' : 'bg-purple-100'
                                        }`}>
                                        <BiQr className={`w-5 h-5 ${item.qrCodeUrl ? 'text-purple-600' : 'text-purple-600'
                                            }`} />
                                    </div>
                                    <h3 className="font-medium text-gray-800">
                                        {item.qrCodeUrl ? 'QR Code' : 'Generate QR Code'}
                                    </h3>
                                </div>

                                {item.qrCodeUrl ? (
                                    <div className="space-y-3">
                                        <div className="flex justify-center">
                                            <img
                                                src={`https://scan-go-backend.onrender.com${item.qrCodeUrl}`}
                                                alt="QR Code"
                                                className="h-32 w-32 object-contain"
                                            />
                                        </div>
                                        <a
                                            href={`https://scan-go-backend.onrender.com${item.qrCodeUrl}`}
                                            download={`${item.itemName}-qrcode.png`}
                                            target='_blank'
                                            className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800"
                                        >
                                            <FiDownload className="mr-1" /> Download PNG
                                        </a>

                                    </div>
                                ) : (
                                    <button
                                        onClick={onGenerateQR}
                                        className="w-full py-3 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                                    >
                                        Generate QR Code
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DemoItemDetails;