"use client";

import { useState, useEffect, useRef } from "react";

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── SVG icons (inline, no CDN dependency) ── */
const IgIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const MailIcon = ({ color = "#2D6A6A" }: { color?: string }) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

export default function HomePage() {
  const [status, setStatus] = useState<string | null>(null);
  const [heroIn, setHeroIn] = useState(false);

  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();

  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 80); return () => clearTimeout(t); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { setStatus("success"); form.reset(); } else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F8F5F0; -webkit-font-smoothing: antialiased; }
        .page { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #F8F5F0; }

        /* ── NAV ── */
        .nav {
          position: absolute; top: 0; left: 0; right: 0; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 2rem;
        }
        .nav-logo { font-family: 'Lora', serif; font-size: 0.95rem; font-weight: 600; color: #fff; text-decoration: none; }
        .nav-links { display: flex; gap: 1.5rem; align-items: center; }
        .nav-links a { font-size: 0.78rem; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.15s; }
        .nav-links a:hover { color: #fff; }
        .nav-cta {
          font-size: 0.78rem; font-weight: 600; color: #fff;
          background: rgba(45,106,106,0.75); border: 1px solid rgba(142,206,206,0.3);
          padding: 0.4rem 1rem; border-radius: 5px; text-decoration: none;
          transition: background 0.15s;
        }
        .nav-cta:hover { background: #2D6A6A; }

        /* ── HERO ── */
        .hero {
          position: relative; min-height: 88vh;
          display: flex; align-items: flex-end; overflow: hidden;
          background: #0f1e1e;
        }
        .hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          opacity: 0; transition: opacity 1.4s ease;
        }
        .hero-img.in { opacity: 0.5; }
        .hero-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,22,22,0.92) 0%, rgba(10,22,22,0.4) 55%, transparent 100%);
        }
        .hero-body {
          position: relative; z-index: 2;
          padding: 0 2rem 3rem; max-width: 680px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .hero-body.in { opacity: 1; transform: none; }
        .hero-kicker {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.13em;
          color: #8ecece; text-transform: uppercase; margin-bottom: 0.9rem;
        }
        .hero-h1 {
          font-family: 'Lora', serif; font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 600; line-height: 1.18; color: #F8F5F0; margin-bottom: 1rem;
        }
        .hero-h1 em { font-style: italic; color: #8ecece; }
        .hero-p {
          font-size: 0.9rem; line-height: 1.75; color: #b0c8c8;
          max-width: 460px; margin-bottom: 1.75rem;
        }
        .hero-actions { display: flex; gap: 0.65rem; flex-wrap: wrap; }
        .btn-primary {
          background: #2D6A6A; color: #F8F5F0; font-size: 0.82rem; font-weight: 600;
          padding: 0.72rem 1.4rem; border-radius: 6px; border: none;
          text-decoration: none; cursor: pointer; transition: background 0.15s;
        }
        .btn-primary:hover { background: #245858; }
        .btn-outline {
          background: transparent; color: rgba(248,245,240,0.8);
          font-size: 0.82rem; font-weight: 500;
          padding: 0.72rem 1.4rem; border-radius: 6px;
          border: 1px solid rgba(248,245,240,0.2);
          text-decoration: none; transition: border-color 0.15s, color 0.15s;
        }
        .btn-outline:hover { border-color: rgba(142,206,206,0.6); color: #8ecece; }

        /* ── TRUST BAR ── */
        .trust {
          background: #2D6A6A;
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 0; padding: 0;
          overflow: hidden;
        }
        .trust-item {
          font-size: 0.72rem; font-weight: 500; color: #c0dcdc;
          padding: 0.7rem 1.4rem;
          border-right: 1px solid rgba(255,255,255,0.1);
          white-space: nowrap;
        }
        .trust-item:last-child { border-right: none; }

        /* ── SHARED SECTION ── */
        .sec { padding: 3.5rem 2rem; }
        .sec-inner { max-width: 960px; margin: 0 auto; }
        .sec-tag {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.11em;
          color: #2D6A6A; text-transform: uppercase; margin-bottom: 0.4rem;
        }
        .sec-h2 {
          font-family: 'Lora', serif; font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          font-weight: 600; color: #1a1a1a; margin-bottom: 0.5rem; line-height: 1.25;
        }
        .sec-sub {
          font-size: 0.85rem; color: #6b7280; line-height: 1.7;
          max-width: 500px; margin-bottom: 2rem;
        }

        /* reveal */
        .rv { opacity: 0; transform: translateY(16px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .rv.in { opacity: 1; transform: none; }

        /* ── SERVICES ── */
        .services-bg { background: #F8F5F0; border-top: 1px solid #EBE5DC; }
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px; background: #EBE5DC;
          border: 1px solid #EBE5DC; border-radius: 10px; overflow: hidden;
        }
        @media (max-width: 600px) { .svc-grid { grid-template-columns: 1fr; } }
        .svc-card {
          background: #fff; padding: 1.4rem 1.5rem;
          display: flex; gap: 1rem; align-items: flex-start;
          transition: background 0.15s;
        }
        .svc-card:hover { background: #fdfbf8; }
        .svc-num {
          font-family: 'Lora', serif; font-size: 1.1rem; font-weight: 600;
          color: #d4c9bc; flex-shrink: 0; line-height: 1; padding-top: 2px;
        }
        .svc-title { font-size: 0.85rem; font-weight: 600; color: #1a1a1a; margin-bottom: 0.3rem; }
        .svc-desc { font-size: 0.78rem; color: #6b7280; line-height: 1.6; }

        /* ── CREDIBILITY ── */
        .cred-bg { background: #fff; border-top: 1px solid #EBE5DC; }
        .cred-layout {
          display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
        }
        @media (max-width: 680px) { .cred-layout { grid-template-columns: 1fr; gap: 1.5rem; } }
        .cred-photo-stack {
          position: relative; height: 340px;
        }
        .cred-photo {
          position: absolute; border-radius: 10px;
          object-fit: cover; border: 3px solid #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .cred-photo.main { width: 72%; height: 88%; top: 0; left: 0; z-index: 1; }
        .cred-photo.side { width: 44%; height: 55%; bottom: 0; right: 0; z-index: 2; }
        .cred-tag {
          position: absolute; bottom: 1rem; left: 1rem; z-index: 3;
          background: #1a2e2e; color: #8ecece;
          font-size: 0.68rem; font-weight: 600;
          padding: 0.35rem 0.7rem; border-radius: 4px;
          display: flex; align-items: center; gap: 0.4rem;
        }
        .pulse { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: pulse 2s infinite; }
        .stats-row { display: flex; gap: 2rem; margin-top: 1.5rem; flex-wrap: wrap; }
        .stat-val {
          font-family: 'Lora', serif; font-size: 1.8rem; font-weight: 600; color: #2D6A6A;
          line-height: 1;
        }
        .stat-lbl { font-size: 0.7rem; color: #9ca3af; font-weight: 500; margin-top: 0.2rem; }
        .cred-body p { font-size: 0.85rem; color: #4b5563; line-height: 1.8; margin-bottom: 0.9rem; }
        .cred-body p:last-of-type { margin-bottom: 0; }

        /* ── TOOLS ── */
        .tools-bg { background: #F8F5F0; border-top: 1px solid #EBE5DC; }
        .tools-intro {
          background: #1a2e2e; border-radius: 10px;
          padding: 1.4rem 1.6rem; margin-bottom: 1.75rem;
          border-left: 3px solid #2D6A6A;
        }
        .tools-intro p {
          font-size: 0.88rem; color: #c0dcdc; line-height: 1.7; font-style: italic;
        }
        .tools-intro strong { color: #8ecece; font-style: normal; }
        .tool-group { margin-bottom: 1.4rem; }
        .tool-group-label {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
          color: #9ca3af; text-transform: uppercase; margin-bottom: 0.6rem;
        }
        .tool-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tool-badge {
          display: inline-flex; align-items: center; gap: 0.35rem;
          background: #fff; border: 1px solid #EBE5DC;
          border-radius: 6px; padding: 0.35rem 0.75rem;
          font-size: 0.78rem; font-weight: 600; color: #1a1a1a;
          transition: border-color 0.15s;
        }
        .tool-badge:hover { border-color: #2D6A6A; }
        .tool-badge-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .tool-badge-text { font-size: 0.68rem; color: #9ca3af; font-weight: 400; }

        /* ── CONTACT ── */
        .contact-bg { background: #fff; border-top: 1px solid #EBE5DC; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
        @media (max-width: 680px) { .contact-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .social-row { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .social-pill {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: #F8F5F0; border: 1px solid #EBE5DC;
          border-radius: 6px; padding: 0.38rem 0.8rem;
          font-size: 0.75rem; font-weight: 600; color: #1a1a1a;
          text-decoration: none; transition: border-color 0.15s;
        }
        .social-pill:hover { border-color: #2D6A6A; }
        .form-lbl { display: block; font-size: 0.68rem; font-weight: 700; color: #9ca3af; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.35rem; }
        .form-field {
          width: 100%; background: #F8F5F0; border: 1px solid #EBE5DC;
          border-radius: 7px; padding: 0.65rem 0.85rem;
          font-size: 0.83rem; color: #1a1a1a; font-family: 'Inter', sans-serif;
          outline: none; transition: border-color 0.15s, box-shadow 0.15s;
          margin-bottom: 0.85rem;
        }
        .form-field:focus { border-color: #2D6A6A; box-shadow: 0 0 0 3px rgba(45,106,106,0.08); }
        .form-field::placeholder { color: #c4b9ae; }
        .form-btn {
          width: 100%; background: #2D6A6A; color: #F8F5F0;
          font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 600;
          padding: 0.78rem; border-radius: 7px; border: none; cursor: pointer;
          transition: background 0.15s;
        }
        .form-btn:hover { background: #245858; }
        .form-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .contact-side-img {
          border-radius: 10px; overflow: hidden; position: relative; height: 100%; min-height: 360px;
        }
        .contact-side-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .contact-avail {
          position: absolute; bottom: 1rem; left: 1rem;
          background: rgba(10,22,22,0.8); backdrop-filter: blur(6px);
          border-radius: 6px; padding: 0.5rem 0.8rem;
          font-size: 0.72rem; color: #c0dcdc;
          display: flex; align-items: center; gap: 0.4rem;
        }

        /* ── FOOTER ── */
        .footer {
          background: #0f1e1e; padding: 1.4rem 2rem;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 0.75rem;
        }
        .footer-copy { font-size: 0.72rem; color: #4a6060; }
        .footer-links { display: flex; gap: 1rem; align-items: center; }
        .footer-link {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 0.72rem; color: #6a9090; text-decoration: none;
          transition: color 0.15s;
        }
        .footer-link:hover { color: #8ecece; }

        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
      `}</style>

      <div className="page">

        {/* ── HERO ── */}
        <section className="hero">
          <nav className="nav">
            <a href="#" className="nav-logo">Von Untalan</a>
            <div className="nav-links">
              <a href="#services">Services</a>
              <a href="#tools">Tools</a>
              <a href="#contact" className="nav-cta">Hire me</a>
            </div>
          </nav>

          {/* person-at-work photo — remote ops, not just property */}
          <img
            className={`hero-img ${heroIn ? "in" : ""}`}
            src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1600&q=80"
            alt="Remote operations work setup"
            onLoad={() => {}}
          />
          <div className="hero-grad" />

          <div className={`hero-body ${heroIn ? "in" : ""}`}>
            <p className="hero-kicker">STR Virtual Assistant & Operations Specialist</p>
            <h1 className="hero-h1">
              Your properties.<br />
              My systems.<br />
              <em>Less for you to worry about.</em>
            </h1>
            <p className="hero-p">
              I handle everything that eats your time — guest comms, turnover coordination,
              listing optimization, and operations systems — so you can own properties
              without managing them.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">Work with me</a>
              <a href="#services" className="btn-outline">See what I handle</a>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="trust">
          {["Airbnb · Vrbo · Booking.com", "Guesty & Hostaway", "Breezeway & Ensoconnect", "5★ guest reviews", "Remote · async-ready"].map((t, i) => (
            <span className="trust-item" key={i}>{t}</span>
          ))}
        </div>

        {/* ── SERVICES ── */}
        <section id="services" className="sec services-bg">
          <div className="sec-inner">
            <div ref={s1.ref} className={`rv ${s1.visible ? "in" : ""}`}>
              <p className="sec-tag">What I handle</p>
              <h2 className="sec-h2">End-to-end property support</h2>
              <p className="sec-sub">From the first guest inquiry to the post-stay review — nothing slips.</p>
              <div className="svc-grid">
                {[
                  { n: "01", t: "Guest Hospitality", d: "Inquiry handling, booking vetting, check-in/out flows, and real-time troubleshooting. Your guests get fast, warm responses. You get 5-star reviews." },
                  { n: "02", t: "Turnover Logistics", d: "Cleaning crew scheduling, task board management, and maintenance tracking. Every turnover is documented and every stay starts spotless." },
                  { n: "03", t: "Listing Optimization", d: "High-converting titles, SEO-structured photo captions, and dynamic pricing — tuned to push occupancy and revenue without discounting your value." },
                  { n: "04", t: "SOPs & Systems", d: "Digital welcome guides, house rule books, unified message templates, and admin databases. I build the infrastructure that makes your operation scalable." },
                ].map((s) => (
                  <div className="svc-card" key={s.n}>
                    <span className="svc-num">{s.n}</span>
                    <div>
                      <p className="svc-title">{s.t}</p>
                      <p className="svc-desc">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CREDIBILITY ── */}
        <section className="sec cred-bg">
          <div className="sec-inner">
            <div ref={s2.ref} className={`rv ${s2.visible ? "in" : ""}`}>
              <div className="cred-layout">
                <div className="cred-photo-stack">
                  {/* operational photo — laptop + notes, not just a pretty beach house */}
                  <img className="cred-photo main"
                    src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=700&q=80"
                    alt="Tablet with property management dashboard" />
                  <img className="cred-photo side"
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80"
                    alt="Clean vacation rental living room" />
                  <div className="cred-tag">
                    <span className="pulse" />
                    Ops running. Host offline.
                  </div>
                </div>
                <div className="cred-body">
                  <p className="sec-tag">Why it works</p>
                  <h2 className="sec-h2">I don't need babysitting.</h2>
                  <p>I specialize in STR operations — not general VA tasks. I've worked across multi-property setups on Airbnb, Vrbo, and Booking.com, and I know how to keep things moving without waiting for instructions on every decision.</p>
                  <p>Whether you're running one listing or scaling past ten, I plug into your existing systems and take ownership of the moving parts — so you stop being the bottleneck in your own business.</p>
                  <div className="stats-row">
                    {[["5★", "review standard"], ["24/7", "guest coverage"], ["3+", "yrs STR ops"]].map(([v, l]) => (
                      <div key={l}>
                        <p className="stat-val">{v}</p>
                        <p className="stat-lbl">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section id="tools" className="sec tools-bg">
          <div className="sec-inner">
            <div ref={s3.ref} className={`rv ${s3.visible ? "in" : ""}`}>
              <p className="sec-tag">Tools & software</p>
              <h2 className="sec-h2">I already know your stack.</h2>

              <div className="tools-intro">
                <p>
                  The stronger point isn't that I know Guesty or Hostaway.
                  It's that <strong>I can step into your existing operation without making you retrain
                  or rebuild anything.</strong> Your systems stay. I just start running them.
                </p>
              </div>

              {[
                {
                  label: "PMS & Channel Managers",
                  tools: [
                    { name: "Guesty", dot: "#0A2540", note: "PMS" },
                    { name: "Hostaway", dot: "#1B3A6B", note: "PMS" },
                  ]
                },
                {
                  label: "Booking Platforms",
                  tools: [
                    { name: "Airbnb", dot: "#FF5A5F", note: "" },
                    { name: "Vrbo", dot: "#1A5276", note: "" },
                    { name: "Booking.com", dot: "#003580", note: "" },
                  ]
                },
                {
                  label: "Field Operations",
                  tools: [
                    { name: "Breezeway", dot: "#00B4A6", note: "turnover" },
                    { name: "Ensoconnect", dot: "#6C3FC5", note: "guest exp" },
                  ]
                },
                {
                  label: "Workflow & Productivity",
                  tools: [
                    { name: "Asana", dot: "#F06A6A", note: "tasks" },
                    { name: "Slack", dot: "#4A154B", note: "comms" },
                    { name: "Notion", dot: "#1a1a1a", note: "docs" },
                    { name: "Canva", dot: "#00C4CC", note: "design" },
                  ]
                },
              ].map((g) => (
                <div className="tool-group" key={g.label}>
                  <p className="tool-group-label">{g.label}</p>
                  <div className="tool-row">
                    {g.tools.map((t) => (
                      <span className="tool-badge" key={t.name}>
                        <span className="tool-badge-dot" style={{ background: t.dot }} />
                        {t.name}
                        {t.note && <span className="tool-badge-text">· {t.note}</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="sec contact-bg">
          <div className="sec-inner">
            <div ref={s4.ref} className={`rv ${s4.visible ? "in" : ""}`}>
              <div className="contact-grid">
                <div>
                  <p className="sec-tag">Get in touch</p>
                  <h2 className="sec-h2">Let's work together.</h2>
                  <p style={{ fontSize: "0.85rem", color: "#6b7280", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    Tell me about your property and where things are breaking down. I'll reply within 24 hours.
                  </p>

                  <div className="social-row">
                    <a href="https://www.instagram.com/vonstrva/" target="_blank" rel="noopener noreferrer" className="social-pill">
                      <IgIcon /> @vonstrva
                    </a>
                    <a href="mailto:vonwrkspace@gmail.com" className="social-pill">
                      <MailIcon /> vonwrkspace@gmail.com
                    </a>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <label className="form-lbl">Your name or property</label>
                    <input className="form-field" type="text" name="name" required placeholder="Ocean Breeze Villa" />
                    <label className="form-lbl">Email</label>
                    <input className="form-field" type="email" name="email" required placeholder="you@email.com" />
                    <label className="form-lbl">Message</label>
                    <textarea className="form-field" name="message" rows={4} required
                      placeholder="Tell me about your property, current pain points, or goals…"
                      style={{ resize: "none" }} />
                    <button className="form-btn" type="submit" disabled={status === "loading"}>
                      {status === "loading" ? "Sending…" : "Send message"}
                    </button>
                    {status === "success" && <p style={{ fontSize: "0.8rem", color: "#2D6A6A", textAlign: "center", marginTop: "0.65rem" }}>Sent. I'll be in touch soon.</p>}
                    {status === "error" && <p style={{ fontSize: "0.8rem", color: "#b91c1c", textAlign: "center", marginTop: "0.65rem" }}>Something went wrong. Try again.</p>}
                  </form>
                </div>

                <div className="contact-side-img">
                  <img
                    src="https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80"
                    alt="Cozy well-managed rental interior"
                  />
                  <div className="contact-avail">
                    <span className="pulse" style={{ background: "#4ade80" }} />
                    Available for new clients
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <span className="footer-copy">© 2025 Von Untalan · STR VA & Operations Specialist</span>
          <div className="footer-links">
            <a href="https://www.instagram.com/vonstrva/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <IgIcon /> @vonstrva
            </a>
            <a href="mailto:vonwrkspace@gmail.com" className="footer-link">
              <MailIcon color="#6a9090" /> vonwrkspace@gmail.com
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}