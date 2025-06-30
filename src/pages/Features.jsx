import FeaturesImage from "../assets/features.png";

const featureItems = [
  {
    title: "Scan a QR Code",
    description:
      "Users can scan a QR code placed on exhibits or products to trigger instant playback of audio guides.",
    icon: (
      <svg className="mb-3 fill-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
        <path d="M4 4h4v4H4V4Zm0 6h4v4H4v-4Zm6-6h4v4h-4V4Zm6 0h4v4h-4V4ZM10 10h4v4h-4v-4Zm6 0h4v4h-4v-4ZM4 16h4v4H4v-4Zm6 0h4v4h-4v-4Zm6 0h4v4h-4v-4Z" />
      </svg>
    ),
  },
  {
    title: "Listen Instantly",
    description:
      "No delays or downloads. Audio starts playing immediately after scanning the code for a smooth experience.",
    icon: (
      <svg className="mb-3 fill-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
        <path d="M3 5v14l14-7L3 5Z" />
      </svg>
    ),
  },
  {
    title: "Multi-language Support",
    description:
      "Offer audio content in multiple languages so international visitors can enjoy the full experience.",
    icon: (
      <svg className="mb-3 fill-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
        <path d="M12 2C6.48 2 2 6.48 2 12h2a8 8 0 1 1 8 8v2c5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    title: "Offline Accessibility",
    description:
      "Once downloaded, the guide remains available even without internet, perfect for remote locations.",
    icon: (
      <svg className="mb-3 fill-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
        <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="relative bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header Line with Label */}
        <div className="relative flex items-center justify-center py-12">
          <div className="absolute -left-20 top-36 w-64 h-20 rotate-12 bg-indigo-500 opacity-20 blur-2xl rounded-full"></div>
          <div className="absolute right-0 top-24 w-40 h-20 bg-purple-300 opacity-20 blur-2xl rounded-full"></div>

          <div className="w-full border-t border-gray-200 relative z-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-black text-sm font-semibold tracking-wider uppercase">
              Features
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 md:gap-x-12 md:gap-y-16 z-10 relative">
          {featureItems.map((item, idx) => (
            <article key={idx}>
              <div className="mb-3">{item.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
