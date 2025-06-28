export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-indigo-500/20 text-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <div className="text-lg font-semibold text-white">
          Scan & Go<span className="text-indigo-400">.</span>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Support</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-indigo-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Scan & Go. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
