import { useState } from "react";
import { Link } from "react-router-dom";

/* ── Icons ───────────────────────── */
const Logo = () => (
  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
    A
  </div>
);

const DlIcon = () => <span>⬇</span>;
const ShieldIcon = () => <span>🛡</span>;

/* ── Platform Data ───────────────── */
const PLATFORMS = [
  {
    key: "win",
    label: "Windows",
    title: "Download for Windows",
    desc: "Compatible with Windows 10 and above.",
    ext: ".exe",
    btn: "bg-blue-600 hover:bg-blue-700",
    route: "/windows-cleaner",
    download: "YOUR_WINDOWS_DOWNLOAD_LINK",
  },
  {
    key: "lnx",
    label: "Linux",
    title: "Download for Linux",
    desc: "Ubuntu, Debian, Fedora supported.",
    ext: ".tar.gz",
    btn: "bg-orange-500 hover:bg-orange-600",
    route: "/linux-cleaner",
    download: "YOUR_LINUX_DOWNLOAD_LINK",
  },
  {
    key: "mac",
    label: "macOS",
    title: "Download for macOS",
    desc: "macOS Monterey or later.",
    ext: ".dmg",
    btn: "bg-gray-700 hover:bg-gray-800",
    route: "/mac-cleaner",
    download:
      "https://www.dropbox.com/scl/fi/1q5e4y1l9b6w04mqb8uyw/accountsdeck.app.zip?rlkey=8yddb4kcb7b194yv30hryld68&st=mdbc5n2q&dl=0", // ✅ dl=1
  },
];

/* ── Card Component ──────────────── */
function Card({ p }) {
  return (
    <Link
      to={p.route}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
    >
      {/* Label */}
      <span className="text-xs font-bold tracking-widest uppercase text-blue-400">
        {p.label}
      </span>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mt-2">
        {p.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 mt-2 mb-5 flex-grow">
        {p.desc}
      </p>

      {/* ✅ Download Button FIXED */}
      <button
        onClick={(e) => {
          e.preventDefault();   // stop route
          e.stopPropagation();  // stop parent click
          window.open(p.download, "_blank"); // open download
        }}
        className={`flex items-center justify-center gap-2 text-white font-semibold py-2 rounded-lg ${p.btn}`}
      >
        <DlIcon />
        Download {p.ext}
      </button>

      {/* Note */}
      <div className="text-xs text-gray-500 flex items-center justify-center mt-2 gap-1">
        <ShieldIcon /> Secure download
      </div>
    </Link>
  );
}

/* ── Header ─────────────────────── */
function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-white font-bold">
          <Logo /> AccountDeck
        </div>

        <nav className="hidden md:flex gap-6 text-gray-400 text-sm">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Docs</a>
        </nav>

        <button
          className="md:hidden text-white text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </header>

      {open && (
        <div className="md:hidden flex flex-col bg-gray-900 border-b border-white/10">
          {["Features", "Pricing", "Docs"].map((item) => (
            <a
              key={item}
              href="#"
              className="p-4 text-gray-300 border-b border-white/10"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Main Page ──────────────────── */
export default function AccountDeck() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white font-sans">
      
      <Header />

      {/* Hero */}
      <section className="text-center py-20 px-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1 rounded-full text-xs text-blue-300 mb-6">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          v4.2.1 — Latest Release
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
        © 2026 AccountDeck. All rights reserved.
      </footer>
    </div>
  );
}