import { useState } from "react";

const STEPS = [
  {
    title: "Clear Temp Files",
    desc: "Remove temporary files stored by Windows.",
    path: "Win + R → temp",
  },
  {
    title: "Clear %temp%",
    desc: "Delete user temp files.",
    path: "Win + R → %temp%",
  },
  {
    title: "Prefetch Files",
    desc: "Remove unnecessary prefetch files.",
    path: "Win + R → prefetch",
  },
  {
    title: "Disk Cleanup",
    desc: "Use built-in Windows cleanup tool.",
    path: "Win + R → cleanmgr",
  },
];

const COMMANDS = [
  "del /q/f/s %TEMP%\\*",
  "cleanmgr",
  "powercfg -h off",
];

export default function WindowsCleanerPage() {
  const [copied, setCopied] = useState("");

  const copy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">

      <h1 className="text-center text-3xl font-bold py-10">
        Windows Cleanup Guide
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
            <button onClick={() => copy(cmd)} className="bg-blue-600 px-2 rounded">
              {copied === cmd ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}