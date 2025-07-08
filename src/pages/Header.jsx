import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-3">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/80 px-4 border border-gray-200 shadow backdrop-blur-md">
          {/* Logo / Branding */}
          <div className="flex flex-1 items-center text-black font-semibold text-lg tracking-wide">
            <Link to="/" className="hover:text-indigo-600 transition duration-150">
              ScanMeAI
            </Link>
          </div>

          {/* Navigation / CTA Links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                to="/cards"
                className="py-1.5 px-4 rounded-md text-sm font-medium text-white bg-black hover:bg-indigo-700 transition"
              >
                Try Demo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
