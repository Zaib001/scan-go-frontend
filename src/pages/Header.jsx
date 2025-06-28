import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-3">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 border border-gray-700 backdrop-blur-md">
          {/* Logo / Branding */}
          <div className="flex flex-1 items-center text-white font-bold text-lg tracking-wide">
            <Link to="/">Scan & Go</Link>
          </div>

          {/* Sign in / Register Links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                to="/cards"
                className="btn-sm py-1.5 px-4 rounded-md text-sm text-gray-300 bg-gradient-to-b from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-600"
              >
                Demos
              </Link>
            </li>
          
          </ul>
        </div>
      </div>
    </header>
  );
}
