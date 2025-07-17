import { useState, useRef, useEffect } from "react";
import { FaHospital, FaPlay, FaUniversity, FaChevronDown, FaPaintBrush, FaSeedling, FaBookOpen, FaHotel, FaRegBuilding } from 'react-icons/fa'
import ModalVideo from "./ModalVideo";
import { Link } from "react-router-dom";

const user = [
    // English Accents
    {
        name: "Emma ",
        img: "https://randomuser.me/api/portraits/women/65.jpg",
        gender: "female",
        voiceName: "Google US English",
        langCode: "en-US"
    },
    {
        name: "Brian",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
        gender: "male",
        voiceName: "Google UK English Male",
        langCode: "en-GB"
    },
    {
        name: "Ronin",
        img: "https://randomuser.me/api/portraits/men/6.jpg",
        gender: "male",
        voiceName: "Microsoft Mark - English (United States)",
        langCode: "en-AU"
    },
   
    {
        name: "Linda",
        img: "https://randomuser.me/api/portraits/women/82.jpg",
        gender: "female",
        voiceName: "Google Nederlands",
        langCode: "en-CA"
    },
    // Spanish Voices
    {
        name: "Juan",
        img: "https://randomuser.me/api/portraits/men/22.jpg",
        gender: "male",
        voiceName: "Google español",
        langCode: "es-ES"
    },
    {
        name: "Lucía",
        img: "https://randomuser.me/api/portraits/women/33.jpg",
        gender: "female",
        voiceName: "Google español de Estados Unidos",
        langCode: "es-US"
    },
    // French Voices
    {
        name: "Pierre",
        img: "https://randomuser.me/api/portraits/men/41.jpg",
        gender: "male",
        voiceName: "Google français",
        langCode: "fr-FR"
    },
    {
        name: "Sophie ",
        img: "https://randomuser.me/api/portraits/women/44.jpg",
        gender: "female",
        voiceName: "Google français",
        langCode: "fr-FR"
    },
    // German Voices
    {
        name: "Hans",
        img: "https://randomuser.me/api/portraits/men/55.jpg",
        gender: "male",
        voiceName: "Google Deutsch",
        langCode: "de-DE"
    },
    {
        name: "Anna",
        img: "https://randomuser.me/api/portraits/women/66.jpg",
        gender: "female",
        voiceName: "Google Deutsch",
        langCode: "de-DE"
    }
];




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
        videoLink: "https://youtu.be/cAhOO766KMs",
    },
    {
        title: "Garden Centres",
        description:
            "Grow Customer Success and Loyalty. Empower every customer to become a more confident and successful gardener by offering instant audio advice about plant care, right from the pot.",
        videoLink: "https://youtu.be/VGRf3eldUcA",
    },
    {
        title: "Education",
        description:
            "Revolutionize Learning. Empower students with accessible, engaging audio lessons and multi-language translations, making learning personalized and inclusive for every student.",
        videoLink: "https://youtu.be/30aq5ABwnY4",
    },
    {
        title: "Tourism - Hotels & Attractions",
        description:
            "Elevate the guest experience by providing instant, personalized information about hotel services, amenities, and local attractions in multiple languages through QR codes.",
        videoLink: "https://youtu.be/Dh_eAFyraPg",
    },
    {
        title: "Local Councils",
        description:
            "Connect with Every Citizen. Ensure all public information and services are accessible to everyone, regardless of language barriers, through accessible audio and translations.",
        videoLink: "https://youtu.be/CXa0i5vaWBg",
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

Imaginez que vous êtes un visiteur dans un musée, entendant instantanément la description d'une exposition dans votre langue préférée simplement en scannant un code QR. Ou un patient dans un hôpital, écoutant des instructions de sortie cruciales dans sa langue natale. C'est le pouvoir des codes QR dynamiques avec synthèse vocale et traduction — un service qui peut révolutionner la manière dont votre entreprise communique.

Vous ne créez pas de nouveau contenu, vous débloquez simplement tout le potentiel de ce que vous avez déjà.

Nous aidons les organisations comme la vôtre à convertir facilement tout texte en audio parlé et à le traduire en plusieurs langues — accessible via un simple code QR. Finie l'information statique et monolingue.`,

    German: `Verwandeln Sie Ihre Informationen in zugängliche Erlebnisse

Stellen Sie sich vor, Sie sind ein Besucher in einem Museum und hören sofort die Beschreibung einer Ausstellung in Ihrer bevorzugten Sprache – einfach durch das Scannen eines QR-Codes. Oder ein Patient in einem Krankenhaus, der wichtige Entlassungshinweise in seiner Muttersprache anhört. Das ist die Kraft dynamischer QR-Codes mit Text-to-Speech und Übersetzung – ein Service, der die Kommunikation Ihres Unternehmens revolutionieren kann.

Sie erstellen keine neuen Inhalte – Sie nutzen einfach das volle Potenzial dessen, was Sie bereits haben.

Wir helfen Organisationen wie Ihrer, jeden beliebigen Text einfach in gesprochene Audios umzuwandeln und in mehrere Sprachen zu übersetzen – alles über einen einfachen QR-Code zugänglich. Keine statischen, einsprachigen Informationen mehr.`
};

export default function Hero() {
    const [selectedVoice, setSelectedVoice] = useState(user[0]);
    const [selectedLang, setSelectedLang] = useState("English");
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [voices, setVoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [openVideoIndex, setOpenVideoIndex] = useState(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isVideoOpen1, setIsVideoOpen1] = useState(false);
    const wordRefs = useRef([]);
    const textContainerRef = useRef(null);

    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            setVoices(voices);

            // Find the best available voice for the current selection
            if (voices.length > 0) {
                const findBestVoice = () => {
                    // 1. Try exact match first
                    const exactMatch = voices.find(v => v.name === selectedVoice.voiceName);
                    if (exactMatch) return exactMatch;

                    // 2. Try matching language and gender
                    const langGenderMatch = voices.find(v =>
                        v.lang === selectedVoice.langCode &&
                        ((selectedVoice.gender === 'female' && (v.name.includes('Female') || v.name.includes('Woman'))) ||
                            (selectedVoice.gender === 'male' && (v.name.includes('Male') || v.name.includes('Man'))))
                    );
                    if (langGenderMatch) return langGenderMatch;

                    // 3. Try matching just language
                    const langMatch = voices.find(v => v.lang === selectedVoice.langCode);
                    if (langMatch) return langMatch;

                    // 4. Fallback to first available voice
                    return voices[0];
                };

                const bestVoice = findBestVoice();
                if (bestVoice && bestVoice.name !== selectedVoice.voiceName) {
                    setSelectedVoice(prev => ({
                        ...prev,
                        voiceName: bestVoice.name,
                        langCode: bestVoice.lang
                    }));
                }
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [selectedVoice]);
useEffect(() => {
    console.log("Available voices:", window.speechSynthesis.getVoices());
}, []);
 const playText = () => {
    if (isSpeaking) {
        stopText();
        return;
    }

    const text = translations[selectedLang];
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedVoice.langCode;

    // Voice selection logic (keep your existing code)
    const availableVoices = window.speechSynthesis.getVoices();
    let voice = availableVoices.find(v => v.name === selectedVoice.voiceName);
    
    if (!voice) {
        voice = availableVoices.find(v =>
            v.lang === selectedVoice.langCode &&
            ((selectedVoice.gender === 'female' && (v.name.includes('Female') || v.name.includes('Woman'))) ||
             (selectedVoice.gender === 'male' && (v.name.includes('Male') || v.name.includes('Man'))))
        );
    }
    
    if (!voice) {
        voice = availableVoices.find(v => v.lang === selectedVoice.langCode);
    }
    
    if (!voice) {
        voice = availableVoices[0];
        console.warn("Using fallback voice:", voice);
    }

    if (voice) {
        utterance.voice = voice;
        console.log("Using voice:", voice.name);
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;

    setIsSpeaking(true);
    setCurrentWordIndex(null);

    // Reset all highlights
    wordRefs.current.forEach(el => {
        if (el) {
            el.style.backgroundColor = 'transparent';
            el.style.fontWeight = 'normal';
        }
    });

    // Improved word splitting that preserves whitespace
    const wordRegex = /(\S+|\s+)/g;
    const words = [];
    let match;
    while ((match = wordRegex.exec(text)) !== null) {
        words.push(match[0]);
    }

    // Create word boundaries
    let wordBoundaries = [];
    let currentPos = 0;
    words.forEach((word, index) => {
        wordBoundaries.push({
            start: currentPos,
            end: currentPos + word.length,
            word: word,
            index: index
        });
        currentPos += word.length;
    });

    // Store the last highlighted index to prevent duplicate highlights
    let lastHighlightedIndex = null;

    utterance.onboundary = (event) => {
        if (event.name !== 'word') return;

        const charIndex = event.charIndex;
        
        // Find the current word
        const currentWord = wordBoundaries.find(w => 
            charIndex >= w.start && charIndex < w.end
        );

        if (currentWord && currentWord.index !== lastHighlightedIndex) {
            setCurrentWordIndex(currentWord.index);
            lastHighlightedIndex = currentWord.index;

            // Highlight current word
            wordRefs.current.forEach((el, idx) => {
                if (el) {
                    const shouldHighlight = idx === currentWord.index;
                    el.style.backgroundColor = shouldHighlight ? '#a5b4fc' : 'transparent';
                    el.style.fontWeight = shouldHighlight ? 'bold' : 'normal';
                    el.style.transition = 'background-color 0.2s ease';
                    
                    // For better visibility, you can add more styling
                    if (shouldHighlight) {
                        el.style.padding = '2px 4px';
                        el.style.borderRadius = '4px';
                    } else {
                        el.style.padding = '0';
                    }
                }
            });

            // Scroll to word
            const wordElement = wordRefs.current[currentWord.index];
            if (wordElement && textContainerRef.current) {
                const container = textContainerRef.current;
                const wordRect = wordElement.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                // Calculate scroll position to center the word
                const scrollTop = wordRect.top - containerRect.top + container.scrollTop - (containerRect.height / 3);
                container.scrollTo({ 
                    top: scrollTop, 
                    behavior: 'smooth' 
                });
            }
        }
    };

    utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentWordIndex(null);
        lastHighlightedIndex = null;
        
        // Reset all highlights when done
        wordRefs.current.forEach(el => {
            if (el) {
                el.style.backgroundColor = 'transparent';
                el.style.fontWeight = 'normal';
                el.style.padding = '0';
            }
        });
    };

    utterance.onerror = (event) => {
        console.error('SpeechSynthesis error:', event);
        setIsSpeaking(false);
        setCurrentWordIndex(null);
        lastHighlightedIndex = null;
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
};

    const stopText = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setCurrentWordIndex(null);
        wordRefs.current.forEach(el => {
            if (el) {
                el.style.backgroundColor = 'transparent';
                el.style.fontWeight = 'normal';
            }
        });
    };

    const isVoiceAvailable = (userVoice) => {
        const availableVoices = window.speechSynthesis.getVoices();

        // If no voices loaded yet, assume available (will be checked again later)
        if (availableVoices.length === 0) return true;

        return availableVoices.some(v => {
            // First try exact match
            if (v.name === userVoice.voiceName) return true;

            // Then try language match with voice characteristics
            if (v.lang === userVoice.langCode) {
                // Check for gender indicators in voice name
                const voiceGender =
                    v.name.toLowerCase().includes('female') ||
                        v.name.toLowerCase().includes('woman') ? 'female' :
                        v.name.toLowerCase().includes('male') ||
                            v.name.toLowerCase().includes('man') ? 'male' : null;

                // If gender matches or can't be determined, consider it a match
                return !voiceGender || voiceGender === userVoice.gender;
            }

            return false;
        });
    };

    // Filter voices based on selected language
    const filteredUsers = user.filter(u => {
        const langPrefix = selectedLang === "English" ? "en" :
            selectedLang === "Spanish" ? "es" :
                selectedLang === "French" ? "fr" :
                    selectedLang === "German" ? "de" : "en";
        return u.langCode.startsWith(langPrefix);
    });


    return (
        <>
            <div className="bg-gradient-to-r from-white via-indigo-50 to-white py-20 px-6 mt-10">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Scan Me AI text to speech
                    </h2>


                    {/* 🆕 Two-Column Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-left mb-16">
                        {/* Left: Text */}
                        <div className="text-gray-700 text-base md:text-lg leading-relaxed">
                            <h1 className="text-4xl font-extrabold mb-3">Bring Text to Life with audio</h1>
                            <p>
                                <strong>Just imagine</strong> how much written information you have produced in the lifetime of your business.

                                Now reimagine it in an exciting new way that will really engage your customers and users.

                                Scan Me AI is designed to transform your written information into an immersive, interactive <strong>audio experience and much more.</strong>                            </p>
                            <p className="mt-4">
                                Scan Me AI will streamline setup and management for your staff and enrich visitor engagement through user-friendly interfaces, integrated marketing tools, and inclusive accessibility features.                            </p>
                        </div>

                        {/* Right: Video Thumbnail */}
                        <div
                            className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer w-full max-w-lg mx-auto"
                            onClick={() => setIsVideoOpen(true)}
                        >
                            <img
                                src="https://img.youtube.com/vi/y7JcoYQLTQQ/hqdefault.jpg"
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
                    <h1 className="m-10 text-2xl">Providing information in an <strong>audio format</strong> is crucial for accessibility, inclusivity, and engagement.
                    </h1>
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

                </div>

                {/* Fullscreen Modal Video */}
                {isVideoOpen && (
                    <ModalVideo
                        videoSrc="https://www.youtube.com/embed/y7JcoYQLTQQ?autoplay=1" alt="How It Works"
                        isOpen={true}
                        onClose={() => setIsVideoOpen(false)}
                    />
                )}
            </div>

            {/* === Main TTS Section === */}
            <>

                <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
                    <div className="relative max-w-6xl w-full bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-gray-200">
                        <div className="absolute top-0 left-0 w-full text-center py-4 bg-white z-20 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800">Text-to-Speech with Different Accents</h2>
                        </div>

                        <div className="flex flex-col lg:flex-row w-full pt-20">
                            {/* Left: Text + Language */}
                            <div className="w-full lg:w-1/2 p-6 sm:p-10">
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

                                <div
                                    ref={textContainerRef}
                                    className="mt-4 text-gray-800 text-base leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-96"
                                >
                                    {translations[selectedLang]?.split(/(\s+)/).map((word, i) => (
                                        <span
                                            key={i}
                                            ref={(el) => (wordRefs.current[i] = el)}
                                            className="transition duration-150 px-1 rounded"
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Voice Avatars */}
                            <div className="w-full lg:w-1/2 p-6 sm:p-10 bg-white">
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                                    {filteredUsers.map((userItem) => {
                                        const isAvailable = isVoiceAvailable(userItem);
                                        const isSelected = selectedVoice.name === userItem.name;

                                        return (
                                            <div
                                                key={userItem.name}
                                                onClick={() => {
                                                    if (isAvailable) {
                                                        setSelectedVoice(userItem);
                                                        stopText();
                                                    }
                                                }}
                                                className={`flex flex-col items-center text-center cursor-pointer p-2 rounded-lg transition-all ${isSelected ? "bg-indigo-100 scale-105" : "hover:bg-gray-100"
                                                    } ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}
                                                title={!isAvailable ? "Exact voice not available in your browser" : ""}
                                            >
                                                <div className={`rounded-full p-1 transition-all ${isSelected ? "ring-2 ring-indigo-500" : ""
                                                    }`}>
                                                    <img
                                                        src={userItem.img}
                                                        alt={userItem.name}
                                                        className="w-16 h-16 rounded-full object-cover"
                                                    />
                                                </div>
                                                <div className="text-sm font-medium mt-2">{userItem.name}</div>
                                                <div className="text-xs text-gray-500">{userItem.langCode.split('-')[0]}</div>
                                                {!isAvailable && (
                                                    <div className="text-xs text-yellow-500 mt-1">Using similar voice</div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="absolute top-32 left-64 flex gap-4 z-10">
                                <button
                                    className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"
                                    onClick={playText}
                                    title={isSpeaking ? "Stop" : "Play"}
                                >
                                    {isSpeaking ? "■" : <FaPlay />}
                                </button>
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
                        isOpen={true}
                        videoSrc={useCases[openVideoIndex].videoLink.replace("youtu.be/", "www.youtube.com/embed/") + "?autoplay=1"}
                        alt={useCases[openVideoIndex].title}
                        onClose={() => setOpenVideoIndex(null)}
                    />

                )}
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-left mb-16 px-44">
                {/* Left: Text */}
                <div className="text-gray-700 text-base md:text-lg leading-relaxed">
                    <h1 className="text-4xl font-extrabold mb-3">Create Immersive Experiences with AI</h1>
                    <p className="mb-4">
                        Businesses are evolving, and visitor expectations are higher than ever.
                    </p>
                    <p className="mb-4">
                        We empower businesses to create dynamic, immersive, and accessible experiences through AI-driven technology — adding value to their already existing content without the need to start over.
                    </p>
                    <p>
                        As an example, remember when you visited a museum and spent hours reading information on exhibits?
                        <br />
                        <strong>Forget that. Take a look at this.</strong>
                    </p>
                </div>

                {/* Right: Video Thumbnail */}
                <div
                    className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer w-full max-w-lg mx-auto"
                    onClick={() => setIsVideoOpen1(true)}
                >
                    <img
                        src="https://img.youtube.com/vi/tPI9c3Ys8AA/hqdefault.jpg"
                        alt="How It Works"
                        className="w-full h-auto object-cover"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition">
                        <div className="bg-white text-black p-4 rounded-full shadow-lg">
                            <FaPlay className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Modal for new video */}
                {isVideoOpen1 && (
                    <ModalVideo
                        isOpen={true}
                        videoSrc="https://www.youtube.com/embed/tPI9c3Ys8AA?autoplay=1"
                        alt="How It Works"
                        onClose={() => setIsVideoOpen1(false)}
                    />
                )}
            </div>


        </>
    );
}


