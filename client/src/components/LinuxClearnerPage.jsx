import { useState } from "react";

const STEPS = [
  {
    title: "APT Cache Clean",
    desc: "Remove downloaded package files.",
    path: "sudo apt clean",
  },
  {
    title: "Remove Unused Packages",
    desc: "Delete unused dependencies.",
    path: "sudo apt autoremove",
  },
  {
    title: "Clear Logs",
    desc: "Remove old system logs.",
    path: "sudo journalctl --vacuum-time=7d",
  },
  {
    title: "Thumbnail Cache",
    desc: "Clear thumbnail cache.",
    path: "rm -rf ~/.cache/thumbnails/*",
  },
];

const COMMANDS = [
  "sudo apt clean",
  "sudo apt autoremove -y",
  "sudo journalctl --vacuum-time=7d",
  "rm -rf ~/.cache/thumbnails/*",
];

export default function LinuxCleanerPage() {
  const [copied, setCopied] = useState("");

  const copy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">

      <h1 className="text-center text-3xl font-bold py-10">
        Linux Cleanup Guide
      </h1>

      {/* STEPS */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
        {STEPS.map((s, i) => (
          <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{s.desc}</p>
            <div className="bg-black/40 p-2 rounded text-sm font-mono">
              {s.path}
            </div>
          </div>
        ))}
      </div>

      {/* COMMANDS */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-xl mb-4">Commands</h2>

        {COMMANDS.map((cmd, i) => (
          <div key={i} className="flex justify-between bg-black p-3 mb-2 rounded">
            <span className="font-mono">{cmd}</span>
            <button onClick={() => copy(cmd)} className="bg-green-600 px-2 rounded">
              {copied === cmd ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}