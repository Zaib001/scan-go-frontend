import { useState, useRef, useEffect } from "react";
import { FaHospital, FaPlay, FaUniversity, FaChevronDown, FaPaintBrush, FaSeedling, FaBookOpen, FaHotel, FaRegBuilding } from 'react-icons/fa'
import ModalVideo from "./ModalVideo";
import { Link } from "react-router-dom";

const scanVoices = [
    {
        name: "Lina Khoury",
        role: "Multilingual Voice Artist",
        img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "James Okoro",
        role: "Accessibility Advocate",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Sofia Martens",
        role: "Cultural Curator",
        img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        name: "Arjun Patel",
        role: "Educational Voice Guide",
        img: "https://randomuser.me/api/portraits/men/75.jpg",
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
        videoLink: "https://youtu.be/O51IYtV9oQY", // Replace with actual link
    },
    {
        title: "Garden Centres",
        description:
            "Grow Customer Success and Loyalty. Empower every customer to become a more confident and successful gardener by offering instant audio advice about plant care, right from the pot.",
        videoLink: "https://youtu.be/O51IYtV9oQY", // Replace with actual link
    },
    {
        title: "Education",
        description:
            "Revolutionize Learning. Empower students with accessible, engaging audio lessons and multi-language translations, making learning personalized and inclusive for every student.",
        videoLink: "https://youtu.be/O51IYtV9oQY", // Replace with actual link
    },
    {
        title: "Tourism - Hotels & Attractions",
        description:
            "Elevate the guest experience by providing instant, personalized information about hotel services, amenities, and local attractions in multiple languages through QR codes.",
        videoLink: "https://youtu.be/O51IYtV9oQY", // Replace with actual link
    },
    {
        title: "Local Councils",
        description:
            "Connect with Every Citizen. Ensure all public information and services are accessible to everyone, regardless of language barriers, through accessible audio and translations.",
        videoLink: "https://youtu.be/O51IYtV9oQY", // Replace with actual link
    },
];

// Main Demo Users
const users = [
    {
        name: "Luci",
        img: "https://res.cloudinary.com/sagacity/image/upload/c_crop,h_1000,w_680,x_0,y_0/c_scale,w_640/v1401241064/ladies-of-london-noelle_jaauni.jpg",
        gender: "male",
        voiceName: "Google US English", // Adjust based on available voices
        langCode: "en-US"
    },
    {
        name: "Leo",
        img: "https://vms.cdn.speechify.com/avatars/66f6e964-a260-4cf6-8d95-8ca9365208c0.webp",
        gender: "female",
        voiceName: "Google Español", // Adjust as needed
        langCode: "es-ES"
    },
    {
        name: "Maya",
        img: "https://i.pinimg.com/736x/dd/ee/5f/ddee5f30bef9cf6065ac939d21f443b5.jpg",
        gender: "male",
        voiceName: "Google Français", // Adjust as needed
        langCode: "fr-FR"
    },
    {
        name: "Mia",
        img: "https://website.cdn.speechify.com/Kristy.webp?quality=95&width=256",
        gender: "female",
        voiceName: "Google Deutsch", // Adjust as needed
        langCode: "de-DE"
    },
];


const languages = ["English", "Spanish", "French", "German"];

const translations = {
    English: `Transform Your Information into Accessible Experiences

Imagine you are a visitor at a museum, instantly hearing an exhibit's description in your preferred language just by scanning a QR code. Or a patient in a hospital, listening to crucial discharge instructions in their native tongue. This is the power of dynamic QR codes with text-to-speech and translation, and it's a service that can revolutionize how your business communicates.

You're not creating new content, just unlocking the full potential of what you already have.

We help organisations like yours easily convert any text into spoken audio and translate it into multiple languages, all accessible through a simple QR code. No more static, one-language information.`,

    Spanish: `Transforma tu información en experiencias accesibles

Imagina que eres un visitante en un museo, escuchando instantáneamente la descripción de una exposición en tu idioma preferido con solo escanear un código QR. O un paciente en un hospital, escuchando instrucciones médicas cruciales en su lengua materna. Este es el poder de los códigos QR dinámicos con texto a voz y traducción, un servicio que puede revolucionar la forma en que tu negocio se comunica.

No estás creando contenido nuevo, solo desbloqueando todo el potencial del que ya tienes.

Ayudamos a organizaciones como la tuya a convertir fácilmente cualquier texto en audio hablado y traducirlo a varios idiomas, todo accesible a través de un simple código QR. Nada más de información estática en un solo idioma.`,

    French: `Transformez votre information en expériences accessibles

Imaginez que vous êtes un visiteur dans un musée, entendant instantanément la description d'une exposition dans votre langue préférée simplement en scannant un code QR. Ou un patient dans un hôpital, écoutant des instructions de sortie cruciales dans sa langue natale. C’est le pouvoir des codes QR dynamiques avec synthèse vocale et traduction — un service qui peut révolutionner la manière dont votre entreprise communique.

Vous ne créez pas de nouveau contenu, vous débloquez simplement tout le potentiel de ce que vous avez déjà.

Nous aidons les organisations comme la vôtre à convertir facilement tout texte en audio parlé et à le traduire en plusieurs langues — accessible via un simple code QR. Finie l'information statique et monolingue.`,

    German: `Verwandeln Sie Ihre Informationen in zugängliche Erlebnisse

Stellen Sie sich vor, Sie sind ein Besucher in einem Museum und hören sofort die Beschreibung einer Ausstellung in Ihrer bevorzugten Sprache – einfach durch das Scannen eines QR-Codes. Oder ein Patient in einem Krankenhaus, der wichtige Entlassungshinweise in seiner Muttersprache anhört. Das ist die Kraft dynamischer QR-Codes mit Text-to-Speech und Übersetzung – ein Service, der die Kommunikation Ihres Unternehmens revolutionieren kann.

Sie erstellen keine neuen Inhalte – Sie nutzen einfach das volle Potenzial dessen, was Sie bereits haben.

Wir helfen Organisationen wie Ihrer, jeden beliebigen Text einfach in gesprochene Audios umzuwandeln und in mehrere Sprachen zu übersetzen – alles über einen einfachen QR-Code zugänglich. Keine statischen, einsprachigen Informationen mehr.`
};


export default function Hero() {
    const [selectedVoice, setSelectedVoice] = useState(users[0]);
    const [selectedLang, setSelectedLang] = useState("English");
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [voices, setVoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [openVideoIndex, setOpenVideoIndex] = useState(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const wordRefs = useRef([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        loadVoices();
        if (typeof speechSynthesis !== "undefined") {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const playText = () => {
        const utterance = new SpeechSynthesisUtterance(translations[selectedLang]);

        utterance.lang = selectedVoice.langCode || "en-US";

        const availableVoices = speechSynthesis.getVoices();
        const voice = availableVoices.find(v => v.name === selectedVoice.voiceName);

        utterance.voice = voice || null;
        utterance.rate = 1;

        setIsSpeaking(true);
        setCurrentWordIndex(null);

        utterance.onboundary = (event) => {
            if (event.name === "word") {
                const text = translations[selectedLang];
                if (!text) return;

                const textBefore = text.slice(0, event.charIndex);
                const wordIndex = textBefore.split(" ").length - 1;
                setCurrentWordIndex(wordIndex);

                const wordElement = wordRefs.current[wordIndex];
                if (wordElement && wordElement.scrollIntoView) {
                    wordElement.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }
        };


        utterance.onend = () => {
            setIsSpeaking(false);
            setCurrentWordIndex(null);
        };

        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    };




    const stopText = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <>
            <div className="bg-gradient-to-r from-white via-indigo-50 to-white py-20 px-6 mt-10">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Make Every Voice Count
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Our AI-powered narrators help you deliver engaging, accessible, and personalized audio experiences—no app required.
                    </p>

                    {/* 🆕 Two-Column Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-left mb-16">
                        {/* Left: Text */}
                        <div className="text-gray-700 text-base md:text-lg leading-relaxed">
                            <p>
                                Whether you're enhancing a museum tour, providing multilingual support in healthcare, or enriching garden visits, our AI voice solution adapts to your audience — instantly.
                            </p>
                            <p className="mt-4">
                                Just scan a QR code to start — no downloads, no complexity. Empower visitors with inclusive, dynamic audio experiences tailored to every context.
                            </p>
                        </div>

                        {/* Right: Video Thumbnail */}
                        <div className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer w-full max-w-lg mx-auto"
                            onClick={() => setIsVideoOpen(true)}
                        >
                            <img
                                src="https://img.youtube.com/vi/O51IYtV9oQY/maxresdefault.jpg"
                                alt="How It Works"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition">
                                <div className="bg-white text-black p-4 rounded-full shadow-lg">
                                    <FaPlay className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full flex items-center gap-2 justify-center mx-auto mb-16 shadow-lg hover:scale-105 transition"
                        onClick={() => {
                            const section = document.getElementById("try-it-section");
                            section?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        <FaPlay className="text-white" />
                        Try the Demo
                    </button>

                    {/* Grid of Profiles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {scanVoices.map((person, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl p-4 transition duration-300 flex flex-col items-center text-center"
                            >
                                <img
                                    src={person.img}
                                    alt={person.name}
                                    className="w-24 h-24 rounded-lg object-cover mb-4"
                                />
                                <h4 className="text-lg font-semibold text-gray-800">{person.name}</h4>
                                <p className="text-sm text-gray-500">{person.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fullscreen Modal Video */}
                {isVideoOpen && (
                    <ModalVideo
                        videoSrc="https://www.youtube.com/embed/O51IYtV9oQY?autoplay=1"
                        alt="How It Works"
                        isOpen={true}
                        onClose={() => setIsVideoOpen(false)}
                    />
                )}
            </div>

            {/* === Main TTS Section === */}
            <>

                <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4" id="try-it-section">

                    <div className="relative max-w-6xl w-full bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-gray-200">
                        <div className="absolute top-0 left-0 w-full text-center py-4 bg-white z-20 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800">Try it for yourself</h2>
                        </div>
                        <div className="flex flex-col lg:flex-row w-full pt-20">
                            {/* Left Column */}
                            <div className="w-full lg:w-1/2 p-6 sm:p-10">
                                {/* Language Dropdown */}
                                <div className="relative inline-block text-left mb-8 mt-3">
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

                                <div className="mt-4 text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                                    {translations[selectedLang] &&
                                        translations[selectedLang].split(" ").map((word, i) => (
                                            <span
                                                key={i}
                                                ref={(el) => (wordRefs.current[i] = el)}
                                                className={`transition duration-150 ${i === currentWordIndex ? "bg-indigo-200" : ""}`}
                                            >
                                                {word + " "}
                                            </span>
                                        ))}

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
                            <div className="absolute top-32 left-64 flex gap-4 z-10">
                                <button
                                    className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"
                                    onClick={playText}
                                    title="Play"
                                >
                                    <FaPlay />
                                </button>
                                {isSpeaking && (
                                    <button
                                        className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition"
                                        onClick={stopText}
                                        title="Stop"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </>
            {/* Use Case Section */}
            <section className="py-24 relative z-10">
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
                                className="bg-white rounded-xl shadow-xl p-6 transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-indigo-100 hover:transition-all duration-300 ease-in-out flex flex-col justify-between"
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

                                {/* Video Thumbnail */}
                                <div className="relative w-full h-48 rounded-lg overflow-hidden mt-auto">
                                    <button
                                        onClick={() => setOpenVideoIndex(index)}
                                        className="absolute inset-0 group w-full h-full"
                                    >
                                        <img
                                            src={`https://img.youtube.com/vi/${useCase.videoLink.split("youtu.be/")[1]}/mqdefault.jpg`}
                                            alt={`Preview for ${useCase.title}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition">
                                            <div className="bg-white text-black p-3 rounded-full shadow-lg">
                                                <FaPlay className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Global Modal outside the grid */}
                {openVideoIndex !== null && (
                    <ModalVideo
                        videoSrc={useCases[openVideoIndex].videoLink.replace("youtu.be/", "www.youtube.com/embed/") + "?autoplay=1"}
                        alt={useCases[openVideoIndex].title}
                        onClose={() => setOpenVideoIndex(null)}
                    />
                )}
            </section>

        </>
    );
}
