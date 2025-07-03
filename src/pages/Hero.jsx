import { useState, useEffect } from "react";
import { FaHospital,FaPlay,FaUniversity, FaChevronDown,  FaPaintBrush, FaSeedling, FaBookOpen, FaHotel, FaRegBuilding } from 'react-icons/fa'

const celebrityVoices = [
    {
        name: "Snoop",
        role: "Music Icon",
        img: "https://website.cdn.speechify.com/Snoop-large@2x.png",
    },
    {
        name: "Cliff Weitzman",
        role: "Speechify Founder",
        img: "https://website.cdn.speechify.com/Cliff-large@2x.png",
    },
    {
        name: "Gwyneth",
        role: "Actress",
        img: "https://website.cdn.speechify.com/Gwyneth-large@2x.png",
    },
    {
        name: "MrBeast",
        role: "YouTuber",
        img: "https://website.cdn.speechify.com/Beast-large@2x.png",
    },
];
// Use Cases Data
const useCases = [
    {
        title: "Hospitals",
        description:
            "Text-to-speech is vital for hospitals to enhance patient care and operational efficiency. It ensures critical information, like discharge instructions or medication details, is accessible to all, including those with visual impairments or language barriers.",
        videoLink: "https://youtu.be/g0iQI4I9ssc",
    },
    {
        title: "Museums",
        description:
            "Go beyond static labels and unlock deeper engagement for every visitor. Transform your existing exhibit text and research into rich, multi-layered audio narratives and translations.",
        videoLink: "https://youtu.be/tPI9c3Ys8AA",
    },
    {
        title: "Art Galleries",
        description:
            "Deepen the Connection with Every Artwork. Allow your visitors to explore the emotional and technical nuances of each piece through accessible audio and multi-language translations.",
        videoLink: "https://youtu.be/tPI9c3Ys8AA", // Replace with actual link
    },
    {
        title: "Garden Centres",
        description:
            "Grow Customer Success and Loyalty. Empower every customer to become a more confident and successful gardener by offering instant audio advice about plant care, right from the pot.",
        videoLink: "https://youtu.be/tPI9c3Ys8AA", // Replace with actual link
    },
    {
        title: "Education",
        description:
            "Revolutionize Learning. Empower students with accessible, engaging audio lessons and multi-language translations, making learning personalized and inclusive for every student.",
        videoLink: "https://youtu.be/tPI9c3Ys8AA", // Replace with actual link
    },
    {
        title: "Tourism - Hotels & Attractions",
        description:
            "Elevate the guest experience by providing instant, personalized information about hotel services, amenities, and local attractions in multiple languages through QR codes.",
        videoLink: "https://youtu.be/tPI9c3Ys8AA", // Replace with actual link
    },
    {
        title: "Local Councils",
        description:
            "Connect with Every Citizen. Ensure all public information and services are accessible to everyone, regardless of language barriers, through accessible audio and translations.",
        videoLink: "https://youtu.be/tPI9c3Ys8AA", // Replace with actual link
    },
];

// Main Demo Users
const users = [
    {
        name: "Ali",
        img: "https://website.cdn.speechify.com/en-US-Henry-Speechify-gpttts.webp?quality=95&width=256",
        lang: "English",
        gender: "male",
    },
    {
        name: "Sarah",
        img: "https://vms.cdn.speechify.com/avatars/ece5b30a-2994-4f0a-bb7f-63debd021037.webp",
        lang: "Spanish",
        gender: "female",
    },
    {
        name: "Leo",
        img: "https://vms.cdn.speechify.com/avatars/66f6e964-a260-4cf6-8d95-8ca9365208c0.webp",
        lang: "French",
        gender: "male",
    },
    {
        name: "Mia",
        img: "https://website.cdn.speechify.com/Kristy.webp?quality=95&width=256",
        lang: "German",
        gender: "female",
    },
];

const languages = ["English", "Spanish", "French", "German"];

const translations = {
    English: `John is the founder of Scan & Go.\n\nHe created the app so visitors could explore museums and exhibits in a whole new way.\n\nBy scanning QR codes, you can hear stories, history, and facts in your own language—instantly.`,
    Spanish: `Juan es el fundador de Scan & Go.\n\nCreó la aplicación para que los visitantes puedan explorar museos de una manera completamente nueva.\n\nAl escanear códigos QR, puedes escuchar historias y hechos en tu idioma al instante.`,
    French: `Jean est le fondateur de Scan & Go.\n\nIl a créé l'application pour permettre aux visiteurs d'explorer les musées d'une manière totalement nouvelle.\n\nEn scannant les QR codes, vous pouvez entendre des histoires et des faits dans votre propre langue instantanément.`,
    German: `Johann ist der Gründer von Scan & Go.\n\nEr hat die App entwickelt, damit Besucher Museen auf eine ganz neue Weise erleben können.\n\nDurch das Scannen von QR-Codes können Sie Geschichten und Fakten sofort in Ihrer Sprache hören.`,
};

export default function Hero() {
    const [selectedVoice, setSelectedVoice] = useState(users[0]);
    const [selectedLang, setSelectedLang] = useState(users[0].lang);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        loadVoices();
        if (typeof speechSynthesis !== "undefined") {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const playText = () => {
        const text = translations[selectedLang];
        const utterance = new SpeechSynthesisUtterance(text);

        const langCode = {
            English: "en",
            Spanish: "es",
            French: "fr",
            German: "de",
        }[selectedLang];

        const matchingVoice = voices.find(
            (v) =>
                v.lang.toLowerCase().startsWith(langCode) &&
                v.name.toLowerCase().includes(selectedVoice.gender === "male" ? "male" : "female")
        );

        utterance.voice = matchingVoice || null;
        utterance.lang = matchingVoice?.lang || `${langCode}-US`;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    return (
        <>
            {/* === Top Section: Speechify Style === */}
            <div className="bg-gray-50 py-12 px-6">
                <div className="max-w-6xl mx-auto text-center mt-28">
                    <h2 className="text-4xl font-bold text-black mb-4">#1 TEXT TO SPEECH READER.</h2>
                    <p className="text-2xl font-semibold text-black mb-6">LET SCAN & GO READ TO YOU.</p>
                    <button className="bg-black hover:bg-indigo-700 transition text-white px-6 py-3 rounded-full mb-8">Try For Free</button>

                    <div className="flex justify-center items-center flex-wrap gap-10">
                        {celebrityVoices.map((c) => (
                            <div key={c.name} className="flex flex-col items-center text-center">
                                <div className="relative">
                                    <img
                                        src={c.img}
                                        alt={c.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                                    />
                                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow text-black">
                                        <FaPlay />
                                    </button>
                                </div>
                                <p className="text-black font-medium mt-2">{c.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* === Main TTS Section === */}
            <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
                <div className="relative max-w-6xl w-full bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-gray-200">
                    {/* Left Column */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-10">
                        {/* Language Dropdown */}
                        <div className="relative inline-block text-left mb-6">
                            <button
                                onClick={() => setShowLangMenu(!showLangMenu)}
                                className="inline-flex justify-between items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-800 w-48"
                            >
                                {selectedLang}
                                <FaChevronDown className="ml-2" />
                            </button>
                            {showLangMenu && (
                                <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div className="py-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => {
                                                    setSelectedLang(lang);
                                                    setShowLangMenu(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Paragraph Text */}
                        <div className="mt-4 text-gray-800 text-base leading-relaxed whitespace-pre-line">
                            {translations[selectedLang]}
                        </div>
                    </div>

                    {/* Right Column: Users */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-10 bg-white">
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                            {users.map((user) => (
                                <div
                                    key={user.name}
                                    onClick={() => {
                                        setSelectedVoice(user);
                                        setSelectedLang(user.lang);
                                    }}
                                    className="flex flex-col items-center text-center cursor-pointer"
                                >
                                    <div
                                        className={`rounded-full p-1 ${selectedVoice.name === user.name ? "ring-2 ring-black" : ""
                                            }`}
                                    >
                                        <img
                                            src={user.img}
                                            alt={user.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="text-sm font-medium mt-2">{user.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Play Button */}
                    <button
                        className="absolute bottom-6 right-6 bg-black text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"
                        onClick={playText}
                    >
                        <FaPlay />
                    </button>
                </div>
            </div>

            {/* Use Case Section */}
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
                        {/* Replace with relevant icons */}
                        {useCase.title === "Hospitals" && (
                            <FaHospital className="w-16 h-16 text-black transform transition-all hover:rotate-12" />
                        )}
                        {useCase.title === "Museums" && (
                            <FaUniversity className="w-16 h-16 text-black transform transition-all hover:rotate-12" />
                        )}
                        {useCase.title === "Art Galleries" && (
                            <FaPaintBrush className="w-16 h-16 text-black transform transition-all hover:rotate-12" />
                        )}
                        {useCase.title === "Garden Centres" && (
                            <FaSeedling className="w-16 h-16 text-black transform transition-all hover:rotate-12" />
                        )}
                        {useCase.title === "Education" && (
                            <FaBookOpen className="w-16 h-16 text-black transform transition-all hover:rotate-12" />
                        )}
                        {useCase.title === "Tourism - Hotels & Attractions" && (
                            <FaHotel className="w-16 h-16 text-black transform transition-all hover:rotate-12" />
                        )}
                        {useCase.title === "Local Councils" && (
                            <FaRegBuilding className="w-16 h-16 text-black transform transition-all hover:rotate-12" />
                        )}
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-2xl font-semibold text-black mb-4 transition-all duration-200 ease-in-out hover:text-indigo-600">
                        {useCase.title}
                    </h3>
                    <p className="text-gray-600 text-lg mb-4">{useCase.description}</p>

                    {/* Watch Video Link */}
                    <a
                        href={useCase.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-indigo-600 font-medium transition-all duration-300 ease-in-out hover:text-indigo-800 hover:underline"
                    >
                        Watch video
                    </a>
                </div>
            ))}
        </div>
    </div>
</section>

        </>
    );
}
