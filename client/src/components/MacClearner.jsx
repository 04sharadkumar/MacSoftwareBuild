import { useState } from "react";

/* ================= DATA ================= */
const STEPS = [
  {
    title: "Clear User Cache",
    desc: "Safely remove app cache files without affecting system.",
    path: "~/Library/Caches",
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Clear System Cache",
    desc: "Remove system cache (only delete contents inside folders).",
    path: "/Library/Caches",
    color: "from-indigo-500 to-indigo-700",
  },
  {
    title: "Remove Temp Files",
    desc: "Clean temporary macOS files stored by the system.",
    path: "/private/var/folders",
    color: "from-yellow-500 to-orange-600",
  },
  {
    title: "Clear Logs",
    desc: "Delete unnecessary logs to free space.",
    path: "~/Library/Logs",
    color: "from-green-500 to-emerald-700",
  },
];

/* ================= COMMANDS ================= */
const COMMANDS = [
  "rm -rf ~/Library/Caches/*",
  "rm -rf ~/Library/Logs/*",
  "sudo rm -rf /Library/Caches/*",
  "sudo dscacheutil -flushcache",
  "sudo killall -HUP mDNSResponder",
];

/* ================= COMPONENT ================= */
export default function MacCleanerPage() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState("");

  const copyToClipboard = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white font-sans">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 md:px-10 py-4 border-b border-white/10">
        <h1 className="font-bold text-lg">AccountDeck</h1>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-5 h-[2px] bg-gray-400" />
          <span className="w-5 h-[2px] bg-gray-400" />
          <span className="w-5 h-[2px] bg-gray-400" />
        </button>

        <nav className="hidden md:flex gap-6 text-gray-400 text-sm">
          <a href="#">Guide</a>
          <a href="#">Docs</a>
          <a href="#">Support</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="text-center py-16 px-4 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-blue-400 mb-4">
          macOS Cleanup Guide
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Clean Your <span className="text-blue-400">Mac</span>
        </h2>

        <p className="text-gray-400 text-sm md:text-base">
          Safely remove cache, temp files, and logs to improve performance
          and free up storage.
        </p>
      </section>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:translate-y-[-5px] transition"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} mb-4`}
            />

            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{step.desc}</p>

            <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-sm font-mono">
              Cmd + Shift + G → {step.path}
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Safe & tested method
            </p>
          </div>
        ))}
      </div>

      {/* TERMINAL SECTION */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <h3 className="text-xl font-semibold mb-4">
          Terminal Commands (Advanced)
        </h3>

        <div className="space-y-3">
          {COMMANDS.map((cmd, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-black border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-gray-300"
            >
              <span>{cmd}</span>

              <button
                onClick={() => copyToClipboard(cmd)}
                className="ml-4 text-xs bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                {copied === cmd ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>

        {/* WARNING */}
        <p className="text-yellow-500 text-xs mt-4">
          ⚠️ Use sudo commands carefully. Only delete contents inside folders, not the folders themselves.
        </p>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 text-sm mt-16 pb-6">
        © 2026 AccountDeck. All rights reserved.
      </footer>
    </div>
  );
}