import FeaturesImage from "../assets/features.png";

const featureItems = [
  {
    title: "Scan a QR Code",
    description:
      "Users can scan a QR code placed on exhibits or products to trigger instant playback of audio guides.",
    icon: (
      <svg className="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
        <path d="M4 4h4v4H4V4Zm0 6h4v4H4v-4Zm6-6h4v4h-4V4Zm6 0h4v4h-4V4ZM10 10h4v4h-4v-4Zm6 0h4v4h-4v-4ZM4 16h4v4H4v-4Zm6 0h4v4h-4v-4Zm6 0h4v4h-4v-4Z" />
      </svg>
    ),
  },
  {
    title: "Listen Instantly",
    description:
      "No delays or downloads. Audio starts playing immediately after scanning the code for a smooth experience.",
    icon: (
      <svg className="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
        <path d="M3 5v14l14-7L3 5Z" />
      </svg>
    ),
  },
  {
    title: "Multi-language Support",
    description:
      "Offer audio content in multiple languages so international visitors can enjoy the full experience.",
    icon: (
      <svg className="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
        <path d="M12 2C6.48 2 2 6.48 2 12h2a8 8 0 1 1 8 8v2c5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    title: "Offline Accessibility",
    description:
      "Once downloaded, the guide remains available even without internet, perfect for remote locations.",
    icon: (
      <svg className="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
        <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Glowing corners for separator line */}
        <div className="relative flex items-center justify-center py-12 md:py-20">
          {/* Glow - Bottom Left */}
          <div className="absolute -left-40 top-36 bottom-0 w-80 h-20 -rotate-12 bg-indigo-500 opacity-30 blur-2xl rounded-full z-0"></div>
          {/* Glow - Top Right */}
          <div className="absolute right-0 top-96 w-40 h-20 bg-purple-400 opacity-30 blur-2xl rounded-full z-0"></div>

          {/* Separator with "Features" Label */}
          <div className="w-full border-t border-indigo-500 relative z-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 px-4 text-indigo-300 text-sm font-semibold tracking-wider uppercase">
              Features
            </div>
          </div>
        </div>

        {/* Feature Image */}
        <div className="flex justify-center pb-12 z-10 relative" data-aos="fade-up">
          <img
            src={FeaturesImage}
            alt="Feature Illustration"
            width={1104}
            height={384}
            className="max-w-full"
          />
        </div>

        {/* Feature Cards */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 md:gap-x-14 md:gap-y-16 z-10 relative">
          {featureItems.map((item, idx) => (
            <article key={idx}>
              <div className="mb-3">{item.icon}</div>
              <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                {item.title}
              </h3>
              <p className="text-indigo-200/65">
                {item.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
