import { useState } from "react";
import { Link } from "react-router-dom";

// Icons (same as yours, shortened for clarity)
const Logo = () => <div className="w-8 h-8 bg-blue-700 rounded-lg" />;
const DlIcon = () => <span>⬇</span>;
const ShieldIcon = () => <span>🛡</span>;

const PLATFORMS = [
  {
    key: "win",
    label: "Windows",
    title: "Download for Windows",
    desc: "Compatible with Windows 10+",
    ext: ".exe",
    btn: "bg-blue-600 hover:bg-blue-700",
    route: "/windows-cleaner",
  },
  {
    key: "lnx",
    label: "Linux",
    title: "Download for Linux",
    desc: "Ubuntu, Debian, Fedora supported",
    ext: ".tar.gz",
    btn: "bg-orange-500 hover:bg-orange-600",
    route: "/linux-cleaner",
  },
  {
    key: "mac",
    label: "macOS",
    title: "Download for macOS",
    desc: "macOS Monterey and above",
    ext: ".dmg",
    btn: "bg-gray-700 hover:bg-gray-800",
    route: "/mac-cleaner",
  },
];

function Card({ p }) {
  return (
    <Link
      to={p.route}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:translate-y-[-6px] hover:shadow-2xl transition-all duration-300"
    >
      <div className="w-12 h-12 bg-white/10 rounded-xl mb-4 flex items-center justify-center">
        💻
      </div>

      <span className="text-xs font-bold tracking-widest uppercase text-blue-400">
        {p.label}
      </span>

      <h3 className="text-lg font-semibold mt-1 text-white">
        {p.title}
      </h3>

      <p className="text-sm text-gray-400 mt-2 mb-5 flex-grow">
        {p.desc}
      </p>

      <button
        className={`flex items-center justify-center gap-2 text-white font-semibold py-2 rounded-lg ${p.btn}`}
        onClick={(e) => e.stopPropagation()}
      >
        <DlIcon />
        Download {p.ext}
      </button>

      <div className="text-xs text-gray-500 flex items-center justify-center mt-2 gap-1">
        <ShieldIcon /> Secure download
      </div>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-white">
          <Logo /> AccountDeck
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-gray-400">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Docs</a>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </header>

      {open && (
        <div className="flex flex-col bg-gray-900 border-b border-white/10 md:hidden">
          {["Features", "Pricing", "Docs"].map((t) => (
            <a key={t} className="p-4 text-gray-300 border-b border-white/10">
              {t}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default function AccountDeck() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white font-sans">
      
      <Header />

      {/* Hero */}
      <section className="text-center py-20 px-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1 rounded-full text-xs text-blue-300 mb-6">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          v4.2.1 — Latest
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Download <span className="text-blue-400">AccountDeck</span>
        </h1>

        <p className="text-gray-400 text-sm md:text-base">
          Powerful accounting software for Windows, Linux, and macOS.
        </p>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent max-w-md mx-auto mb-12"></div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 px-6 max-w-5xl mx-auto">
        {PLATFORMS.map((p) => (
          <Card key={p.key} p={p} />
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center mt-20 py-6 border-t border-white/10 text-gray-500 text-sm">
        © 2026 AccountDeck
      </footer>
    </div>
  );
}