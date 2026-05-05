import { useState } from "react";
import "../components/MacClearner";
import "../components/WindowsCleanerPage";
import "../components/LinuxClearnerPage";
import { Link } from "react-router-dom";
/* ─────────────────────────────────────────────
   AccountDeck Download Page
   Font: Plus Jakarta Sans
   Stack: React + scoped CSS (no Tailwind needed)
   Responsive: 3-col → 2-col → 1-col
───────────────────────────────────────────── */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0b0f1a;
    --surface: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08);
    --text: #e4e8f0;
    --muted: #5a6378;
    --font: 'Plus Jakarta Sans', sans-serif;
  }

  body {
    font-family: var(--font);
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  .ad-glow {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse 65% 45% at 50% 0%, rgba(79,142,247,0.09) 0%, transparent 70%);
  }
  .ad-wrap { position: relative; z-index: 1; }

  /* ── HEADER ── */
  .ad-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 40px;
    border-bottom: 1px solid var(--border);
  }
  .ad-logo {
    display: flex; align-items: center; gap: 9px;
    font-size: 17px; font-weight: 700; color: #fff;
    letter-spacing: -0.02em; text-decoration: none;
  }
  .ad-nav { display: flex; align-items: center; gap: 30px; }
  .ad-nav a {
    font-size: 14px; font-weight: 500; color: var(--muted);
    text-decoration: none; transition: color .18s;
  }
  .ad-nav a:hover { color: var(--text); }

  .ad-burger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .ad-burger span {
    display: block; width: 20px; height: 2px;
    background: #94a3b8; border-radius: 2px; transition: .25s;
  }

  .ad-mob {
    display: none; flex-direction: column;
    border-bottom: 1px solid var(--border);
    background: #0d1120;
  }
  .ad-mob.open { display: flex; }
  .ad-mob a {
    padding: 14px 24px; font-size: 15px; font-weight: 500;
    color: #94a3b8; text-decoration: none;
    border-bottom: 1px solid var(--border); transition: color .18s;
  }
  .ad-mob a:last-child { border-bottom: none; }
  .ad-mob a:hover { color: #e4e8f0; }

  /* ── HERO ── */
  .ad-hero {
    text-align: center;
    padding: 80px 24px 48px;
    max-width: 660px; margin: 0 auto;
  }
  .ad-pill {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(79,142,247,0.10);
    border: 1px solid rgba(79,142,247,0.22);
    color: #7db3fa;
    font-size: 12px; font-weight: 600; letter-spacing: .05em;
    padding: 5px 14px; border-radius: 999px;
    margin-bottom: 24px; text-transform: uppercase;
  }
  .ad-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4f8ef7;
    animation: blink 1.6s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.2;} }

  .ad-h1 {
    font-size: clamp(34px, 6.5vw, 60px);
    font-weight: 700; letter-spacing: -0.03em; line-height: 1.1;
    color: #fff; margin-bottom: 18px;
  }
  .ad-h1 span {
    background: linear-gradient(120deg, #a8c8ff 0%, #4f8ef7 60%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ad-tagline {
    font-size: clamp(14px, 2vw, 17px); color: var(--muted);
    font-weight: 400; line-height: 1.7;
  }

  /* ── DIVIDER ── */
  .ad-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(79,142,247,0.20) 50%, transparent);
    max-width: 480px; margin: 56px auto 52px;
  }

  /* ── CARDS ── */
  .ad-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 980px; margin: 0 auto; padding: 0 24px;
  }

  .ad-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 32px 24px 26px;
    display: flex; flex-direction: column;
    transition:
      transform .28s cubic-bezier(.22,1,.36,1),
      box-shadow .28s, border-color .28s, background .28s;
  }
  .ad-card:hover {
    transform: translateY(-6px);
    background: rgba(255,255,255,0.065);
    border-color: rgba(79,142,247,0.28);
    box-shadow: 0 20px 48px rgba(0,0,0,0.35);
  }

  .ad-icon-box {
    width: 54px; height: 54px; border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px; flex-shrink: 0;
  }
  .ad-lbl {
    font-size: 11px; font-weight: 700; letter-spacing: .09em;
    text-transform: uppercase; margin-bottom: 8px;
  }
  .ad-card h3 {
    font-size: 17px; font-weight: 700; color: #fff;
    letter-spacing: -0.015em; margin-bottom: 10px; line-height: 1.3;
  }
  .ad-card p {
    font-size: 13.5px; color: var(--muted); line-height: 1.65;
    margin-bottom: 22px; flex-grow: 1;
  }

  /* ── BUTTON ── */
  .ad-btn {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 12px 18px; border-radius: 11px;
    font-family: var(--font); font-size: 14px; font-weight: 700;
    text-decoration: none; color: #fff; letter-spacing: -.01em;
    transition: all .22s cubic-bezier(.22,1,.36,1);
  }
  .ad-btn:hover { transform: scale(1.025); }
  .ad-win {
    background: linear-gradient(135deg, #1a6fd4, #153d8a);
    box-shadow: 0 4px 16px rgba(26,111,212,0.30);
  }
  .ad-win:hover { box-shadow: 0 8px 24px rgba(26,111,212,0.45); }
  .ad-lnx {
    background: linear-gradient(135deg, #c97a10, #7a3a08);
    box-shadow: 0 4px 16px rgba(201,122,16,0.28);
  }
  .ad-lnx:hover { box-shadow: 0 8px 24px rgba(201,122,16,0.44); }
  .ad-mac {
    background: linear-gradient(135deg, #3d3d45, #1e1e24);
    box-shadow: 0 4px 16px rgba(60,60,72,0.35);
  }
  .ad-mac:hover { box-shadow: 0 8px 24px rgba(60,60,72,0.50); }

  .ad-note {
    display: flex; align-items: center; justify-content: center; gap: 5px;
    color: #374151; font-size: 11.5px; margin-top: 9px;
  }

  /* ── LINKS ── */
  .ad-links {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;
    margin-top: 48px; padding: 0 24px;
  }
  .ad-links a {
    font-size: 13px; color: #374151; text-decoration: none;
    display: flex; align-items: center; gap: 6px; transition: color .18s;
  }
  .ad-links a:hover { color: #64748b; }

  /* ── FOOTER ── */
  .ad-footer {
    border-top: 1px solid var(--border);
    margin-top: 64px; padding: 28px 24px; text-align: center;
  }
  .ad-footer p { color: #2d3748; font-size: 13px; }
  .ad-foot-links {
    display: flex; justify-content: center; flex-wrap: wrap; gap: 16px; margin-top: 8px;
  }
  .ad-foot-links a {
    font-size: 12px; color: #2d3748; text-decoration: none; transition: color .18s;
  }
  .ad-foot-links a:hover { color: #64748b; }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .ad-cards { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 540px) {
    .ad-header { padding: 16px 20px; }
    .ad-nav { display: none; }
    .ad-burger { display: flex; }
    .ad-cards { grid-template-columns: 1fr; max-width: 420px; padding: 0 16px; }
    .ad-hero { padding: 56px 16px 36px; }
    .ad-divider { margin: 40px auto 36px; }
  }
`;

// ── SVG Icons ──────────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    <rect width="30" height="30" rx="8" fill="#1d4ed8" />
    <path d="M7 21L11 10.5L15 18L19 13.5L23 21"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DlIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const WinIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M3 5.6L11 4.3V11.5H3V5.6Z" fill="#0078d4" />
    <path d="M12 4.1L21 2.5V11.5H12V4.1Z" fill="#0078d4" />
    <path d="M3 12.5H11V19.7L3 18.4V12.5Z" fill="#0078d4" />
    <path d="M12 12.5H21V21.5L12 19.9V12.5Z" fill="#0078d4" />
  </svg>
);

const LinuxIcon = () => (
  <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="44" rx="21" ry="27" fill="#f59e0b" />
    <ellipse cx="50" cy="44" rx="15" ry="21" fill="#fde68a" />
    <circle cx="43" cy="40" r="3" fill="#292524" />
    <circle cx="57" cy="40" r="3" fill="#292524" />
    <path d="M44 53 Q50 58 56 53" stroke="#292524" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M34 68 Q26 78 31 85 Q36 89 43 86" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M66 68 Q74 78 69 85 Q64 89 57 86" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <ellipse cx="42" cy="86" rx="8" ry="5" fill="#f59e0b" />
    <ellipse cx="58" cy="86" rx="8" ry="5" fill="#f59e0b" />
  </svg>
);

const MacIcon = () => (
  <svg width="26" height="30" viewBox="0 0 814 1000" fill="none">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.4-150.3-109.7C79.6 748.2 30.7 659.6 30.7 576c0-167.2 109.3-255.5 212.3-255.5 79.2 0 144.8 51.9 194.2 51.9 47.1 0 120.9-55 212.3-55 34.2 0 133.7 3.2 192.5 119.5zm-162.3-267.2c37.1-43.4 64.3-103.7 64.3-164 0-8.3-.6-16.6-2-24.3-59.5 2.2-129.5 40.2-171.9 88.3-34.1 38.4-65.5 98.7-65.5 159.7 0 9.3 1.6 18.6 2.2 21.5 3.8.6 10 1.3 16.2 1.3 52.5 0 118.3-36 156.7-82.5z"
      fill="#94a3b8" />
  </svg>
);

// ── Platform data ──────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    key: "win",
    icon: <WinIcon />,
    iconBg: "rgba(0,120,212,0.15)",
    label: "Windows",
    labelColor: "#60a5fa",
    title: "Download for Windows",
    desc: "Compatible with Windows 10 and above. 64-bit installer with built-in auto-updater.",
    ext: ".exe",
    href: "",
    btnCls: "ad-win",
  },
  {
    key: "lnx",
    icon: <LinuxIcon />,
    iconBg: "rgba(217,119,6,0.15)",
    label: "Linux",
    labelColor: "#fbbf24",
    title: "Download for Linux",
    desc: "Supports Ubuntu 20.04+, Debian, Fedora & Arch. Available as a portable tar.gz archive.",
    ext: ".tar.gz",
    href: "#",
    btnCls: "ad-lnx",
  },
  {
    key: "mac",
    icon: <MacIcon />,
    iconBg: "rgba(148,163,184,0.13)",
    label: "macOS",
    labelColor: "#94a3b8",
    title: "Download for macOS",
    desc: "Requires macOS 12 Monterey or later. Universal binary — Intel & Apple Silicon.",
    ext: ".dmg",
    href: "https://www.dropbox.com/scl/fo/dubpg3o1q8awrxryk8ttu/AA8Og61zbOI3ioNdl4zEbao?rlkey=xcxdxrr1mpu1k4by4xm91zn7v&st=ddsnaldj&dl=0",
    btnCls: "ad-mac",
  },
];

// ── Components ────────────────────────────────────────────────────────────
function Card({ p }) {
  const cardContent = (
    <>
      <div className="ad-icon-box" style={{ background: p.iconBg }}>
        {p.icon}
      </div>

      <span className="ad-lbl" style={{ color: p.labelColor }}>
        {p.label}
      </span>

      <h3>{p.title}</h3>
      <p>{p.desc}</p>

      {/* Download Button */}
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`ad-btn ${p.btnCls}`}
        onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
      >
        <DlIcon />
        Download {p.ext}
      </a>

      <div className="ad-note">
        <ShieldIcon />
        Latest version · Secure download
      </div>
    </>
  );

  // 🔥 Route mapping
  if (p.key === "mac") {
    return (
      <Link to="/mac-cleaner" className="ad-card">
        {cardContent}
      </Link>
    );
  }

  if (p.key === "win") {
    return (
      <Link to="/windows-cleaner" className="ad-card">
        {cardContent}
      </Link>
    );
  }

  if (p.key === "lnx") {
    return (
      <Link to="/linux-cleaner" className="ad-card">
        {cardContent}
      </Link>
    );
  }

  return <div className="ad-card">{cardContent}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="ad-header">
        <a className="ad-logo" href="#"><Logo /> AccountDeck</a>
        <nav className="ad-nav">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Docs</a>
        </nav>
        <button className="ad-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span style={{ transform: open ? "rotate(45deg) translateY(7px)" : "" }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? "rotate(-45deg) translateY(-7px)" : "" }} />
        </button>
      </header>
      <div className={`ad-mob ${open ? "open" : ""}`}>
        {["Features", "Pricing", "Docs"].map(t => (
          <a key={t} href="#" onClick={() => setOpen(false)}>{t}</a>
        ))}
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function AccountDeck() {
  return (
    <>
      <style>{styles}</style>
      <div className="ad-glow" />
      <div className="ad-wrap">

        <Header />

        {/* Hero */}
        <section className="ad-hero">
          <div className="ad-pill"><span className="ad-dot" /> v4.2.1 — Latest Release</div>
          <h1 className="ad-h1">Download <span>AccountDeck</span></h1>
          <p className="ad-tagline">
            Powerful accounting software for Windows, Linux, and macOS —
            built for modern businesses.
          </p>
        </section>

        <div className="ad-divider" />

        {/* Cards */}
        <div className="ad-cards">
          {PLATFORMS.map(p => <Card key={p.key} p={p} />)}
        </div>

        {/* Quick links */}
        <div className="ad-links">
          {["Release notes", "System requirements", "Support"].map(t => (
            <a key={t} href="#">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {t}
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="ad-footer">
          <p>© 2026 AccountDeck. All rights reserved.</p>
          <div className="ad-foot-links">
            {["Privacy", "Terms", "Contact"].map(t => <a key={t} href="#">{t}</a>)}
          </div>
        </footer>

      </div>
    </>
  );
}