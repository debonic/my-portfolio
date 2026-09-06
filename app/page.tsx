"use client";

import { useState, useEffect, useRef } from "react";

/* ── tiny hook: fire once when element enters viewport ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── animated wave SVG divider ── */
function WaveDivider({ fill = "#FAF7F2" }: { fill?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none" style={{ lineHeight: 0 }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 60 }}>
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ── floating blob for hero decoration ── */
function Blob() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "10%",
        right: "-80px",
        width: 420,
        height: 420,
        borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
        background: "radial-gradient(circle at 40% 40%, rgba(45,106,106,0.18), transparent 70%)",
        filter: "blur(32px)",
        pointerEvents: "none",
        animation: "blobFloat 8s ease-in-out infinite alternate",
      }}
    />
  );
}

export default function HomePage() {
  const [status, setStatus] = useState<string | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const servicesReveal = useReveal();
  const toolsReveal = useReveal();
  const contactReveal = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) { setStatus("success"); form.reset(); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #FAF7F2; }

        .page { font-family: 'Inter', sans-serif; color: #1C1C1E; background: #FAF7F2; min-height: 100vh; }

        /* hero */
        .hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background: #1a2e2e;
        }
        .hero-img {
          position: absolute; inset: 0;
          object-fit: cover; width: 100%; height: 100%;
          opacity: 0.55;
          transition: opacity 1.2s ease;
        }
        .hero-img.loaded { opacity: 0.55; }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(20,35,35,0.82) 0%,
            rgba(20,35,35,0.3) 50%,
            transparent 100%
          );
        }
        .hero-content {
          position: relative; z-index: 2;
          padding: 0 2rem 3.5rem;
          max-width: 700px;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s;
        }
        .hero-content.visible { opacity: 1; transform: none; }

        .hero-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em;
          color: #8ecece; text-transform: uppercase; margin-bottom: 1rem;
        }
        .hero-headline {
          font-family: 'Lora', Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 600; line-height: 1.2;
          color: #FAF7F2; margin-bottom: 1.2rem;
        }
        .hero-headline em { font-style: italic; color: #8ecece; }
        .hero-sub {
          font-size: 0.95rem; line-height: 1.7;
          color: #c8d8d8; max-width: 480px; margin-bottom: 2rem;
        }
        .hero-cta-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .btn-primary {
          background: #2D6A6A; color: #FAF7F2;
          font-size: 0.85rem; font-weight: 600;
          padding: 0.8rem 1.6rem; border-radius: 6px; border: none;
          cursor: pointer; text-decoration: none;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #245858; }
        .btn-ghost {
          background: transparent; color: #c8d8d8;
          font-size: 0.85rem; font-weight: 500;
          padding: 0.8rem 1.6rem; border-radius: 6px;
          border: 1px solid rgba(200,216,216,0.35);
          cursor: pointer; text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: #8ecece; color: #8ecece; }

        /* trust strip */
        .trust-strip {
          background: #2D6A6A;
          padding: 0.85rem 2rem;
          display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;
          justify-content: center;
        }
        .trust-item {
          font-size: 0.75rem; color: #c0dcdc; font-weight: 500;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .trust-dot { width: 4px; height: 4px; border-radius: 50%; background: #8ecece; }

        /* nav */
        .nav {
          position: absolute; top: 0; left: 0; right: 0; z-index: 10;
          padding: 1.25rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-family: 'Lora', serif; font-size: 1rem; font-weight: 600;
          color: #FAF7F2; text-decoration: none;
        }
        .nav-links { display: flex; gap: 1.5rem; align-items: center; }
        .nav-links a {
          font-size: 0.8rem; color: rgba(250,247,242,0.7);
          text-decoration: none; transition: color 0.2s;
        }
        .nav-links a:hover { color: #FAF7F2; }
        .nav-hire {
          font-size: 0.8rem; font-weight: 600;
          color: #FAF7F2; background: rgba(45,106,106,0.7);
          padding: 0.45rem 1rem; border-radius: 4px; text-decoration: none;
          transition: background 0.2s;
        }
        .nav-hire:hover { background: rgba(45,106,106,1); }

        /* sections */
        .section { padding: 5rem 2rem; }
        .section-inner { max-width: 1000px; margin: 0 auto; }

        .section-label {
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em;
          color: #2D6A6A; text-transform: uppercase; margin-bottom: 0.6rem;
        }
        .section-heading {
          font-family: 'Lora', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 600; color: #1C1C1E; margin-bottom: 0.75rem;
        }
        .section-sub {
          font-size: 0.9rem; color: #6b7280; line-height: 1.7;
          max-width: 520px; margin-bottom: 3rem;
        }

        /* reveal animation */
        .reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: none; }

        /* services */
        .services-bg { background: #FAF7F2; }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .service-card {
          background: #fff;
          border: 1px solid #E8E0D5;
          border-radius: 12px;
          padding: 1.75rem 1.5rem;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .service-card:hover {
          box-shadow: 0 8px 28px rgba(45,106,106,0.1);
          transform: translateY(-3px);
        }
        .service-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: #EAF4F4; display: flex; align-items: center;
          justify-content: center; margin-bottom: 1rem; font-size: 1.2rem;
        }
        .service-title {
          font-family: 'Lora', serif;
          font-size: 1rem; font-weight: 600;
          color: #1C1C1E; margin-bottom: 0.5rem;
        }
        .service-desc {
          font-size: 0.82rem; color: #6b7280; line-height: 1.65;
        }

        /* photo mosaic */
        .mosaic {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: 200px 200px;
          gap: 8px;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 3rem;
        }
        .mosaic-img {
          object-fit: cover; width: 100%; height: 100%;
          display: block;
        }
        .mosaic-main { grid-row: 1 / 3; }

        /* about split */
        .about-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 680px) {
          .about-split { grid-template-columns: 1fr; gap: 2rem; }
          .mosaic { grid-template-columns: 1fr 1fr; grid-template-rows: 150px; }
          .mosaic-main { grid-row: 1; }
        }

        /* tools */
        .tools-bg { background: #f0ede8; }
        .tools-grid {
          display: flex; flex-wrap: wrap; gap: 0.6rem;
        }
        .tool-chip {
          background: #fff; border: 1px solid #E8E0D5;
          font-size: 0.8rem; color: #3d4a4a; font-weight: 500;
          padding: 0.4rem 0.9rem; border-radius: 99px;
          transition: background 0.15s, border-color 0.15s;
        }
        .tool-chip:hover { background: #EAF4F4; border-color: #2D6A6A; color: #2D6A6A; }
        .tools-cat { margin-bottom: 1.5rem; }
        .tools-cat-label {
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em;
          color: #9ca3af; text-transform: uppercase; margin-bottom: 0.6rem;
        }

        /* contact */
        .contact-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: start;
        }
        @media (max-width: 680px) {
          .contact-wrap { grid-template-columns: 1fr; gap: 2rem; }
        }
        .contact-img-wrap {
          border-radius: 14px; overflow: hidden;
          height: 420px; position: relative;
        }
        .contact-img {
          object-fit: cover; width: 100%; height: 100%; display: block;
          filter: brightness(0.9);
        }
        .contact-img-tag {
          position: absolute; bottom: 1rem; left: 1rem;
          background: rgba(20,35,35,0.72); backdrop-filter: blur(6px);
          border-radius: 8px; padding: 0.6rem 0.9rem;
          font-size: 0.75rem; color: #c8d8d8;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .contact-img-tag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80; display: inline-block;
          animation: pulse 2s infinite;
        }

        /* form */
        .form-group { margin-bottom: 1.1rem; }
        .form-label {
          display: block; font-size: 0.72rem; font-weight: 600;
          color: #6b7280; margin-bottom: 0.4rem;
        }
        .form-input {
          width: 100%; background: #fff;
          border: 1px solid #E8E0D5; border-radius: 7px;
          padding: 0.7rem 0.9rem; font-size: 0.85rem; color: #1C1C1E;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .form-input:focus {
          border-color: #2D6A6A;
          box-shadow: 0 0 0 3px rgba(45,106,106,0.1);
        }
        .form-input::placeholder { color: #c4b9ae; }
        .form-submit {
          width: 100%; background: #2D6A6A; color: #FAF7F2;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          padding: 0.85rem; border-radius: 7px;
          border: none; cursor: pointer;
          transition: background 0.2s;
          margin-top: 0.5rem;
        }
        .form-submit:hover { background: #245858; }
        .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* footer */
        .footer {
          background: #1a2e2e; color: #6a9090;
          padding: 2rem; font-size: 0.78rem;
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .footer a { color: #8ecece; text-decoration: none; }

        /* keyframes */
        @keyframes blobFloat {
          from { transform: scale(1) rotate(0deg); }
          to { transform: scale(1.08) rotate(6deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div className="page">

        {/* ── HERO ── */}
        <section className="hero">
          <nav className="nav">
            <a href="#" className="nav-logo">Von Untalan</a>
            <div className="nav-links">
              <a href="#services">Services</a>
              <a href="#tools">Tools</a>
              <a href="#contact" className="nav-hire">Hire me</a>
            </div>
          </nav>

          <img
            className="hero-img loaded"
            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&q=80"
            alt="Coastal vacation rental property"
          />
          <div className="hero-overlay" />
          <Blob />

          <div className={`hero-content ${heroLoaded ? "visible" : ""}`}>
            <p className="hero-eyebrow">STR Virtual Assistant & Operations Specialist</p>
            <h1 className="hero-headline">
              Hi, I'm Von —<br />
              your properties,<br />
              running <em>seamlessly</em>.
            </h1>
            <p className="hero-sub">
              I'm Von Untalan, a short-term rental VA based in the Philippines. I handle
              guest communications, turnover logistics, and listing optimization for
              Airbnb, Vrbo, and Booking.com hosts — so you can step back and breathe.
            </p>
            <div className="hero-cta-row">
              <a href="#contact" className="btn-primary">Work with me</a>
              <a href="#services" className="btn-ghost">See what I do</a>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <div className="trust-strip">
          {[
            "Guesty & Hostaway",
            "Airbnb · Vrbo · Booking.com",
            "Breezeway & Ensoconnect",
            "5★ guest reviews",
            "Remote & async-ready",
          ].map((item, i) => (
            <span key={i} className="trust-item">
              {i > 0 && <span className="trust-dot" />}
              {item}
            </span>
          ))}
        </div>

        <WaveDivider fill="#FAF7F2" />

        {/* ── SERVICES ── */}
        <section id="services" className="section services-bg">
          <div className="section-inner">
            <div ref={servicesReveal.ref} className={`reveal ${servicesReveal.visible ? "visible" : ""}`}>
              <p className="section-label">What I do</p>
              <h2 className="section-heading">End-to-end property support</h2>
              <p className="section-sub">
                From the first guest message to the final review response — I keep your operations tight so nothing slips.
              </p>
              <div className="services-grid">
                {[
                  { icon: "💬", title: "Guest Hospitality", desc: "Inquiry handling, booking vetting, check-in/out flows, and real-time troubleshooting for consistent 5-star outcomes." },
                  { icon: "🧹", title: "Turnover Logistics", desc: "Cleaning crew scheduling, task board management, and maintenance coordination so every stay starts fresh." },
                  { icon: "📈", title: "Listing Optimization", desc: "Compelling titles, SEO-structured captions, and dynamic pricing tuned to maximize occupancy and revenue." },
                  { icon: "📋", title: "SOPs & Systems", desc: "Digital welcome guides, house rule books, messaging templates, and admin databases built to scale." },
                ].map((s) => (
                  <div className="service-card" key={s.title}>
                    <div className="service-icon">{s.icon}</div>
                    <p className="service-title">{s.title}</p>
                    <p className="service-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT / PHOTO ── */}
        <section className="section" style={{ background: "#fff", paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="section-inner">
            <div className="about-split">
              <div>
                <div className="mosaic">
                  <img
                    className="mosaic-img mosaic-main"
                    src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80"
                    alt="Luxury vacation rental pool"
                  />
                  <img
                    className="mosaic-img"
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80"
                    alt="Beach house exterior"
                  />
                  <img
                    className="mosaic-img"
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80"
                    alt="Hotel room interior"
                  />
                </div>
              </div>
              <div>
                <p className="section-label">Why it works</p>
                <h2 className="section-heading">Hospitality ops, handled remotely</h2>
                <p style={{ fontSize: "0.88rem", color: "#4b5563", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  I specialize in short-term rental operations — not general VA work. Every system I build,
                  every message I send, and every schedule I coordinate is designed around one goal:
                  keeping guests happy and hosts hands-off.
                </p>
                <p style={{ fontSize: "0.88rem", color: "#4b5563", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Whether you have one listing or twenty, I work asynchronously across time zones and
                  adapt to your PMS and tools — no steep learning curve required.
                </p>
                <div style={{ display: "flex", gap: "2rem" }}>
                  {[["5★", "review standard"], ["24/7", "guest coverage"], ["3+", "years in STR ops"]].map(([num, label]) => (
                    <div key={label}>
                      <p style={{ fontFamily: "'Lora', serif", fontSize: "1.6rem", fontWeight: 600, color: "#2D6A6A" }}>{num}</p>
                      <p style={{ fontSize: "0.72rem", color: "#9ca3af", fontWeight: 500 }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section id="tools" className="section tools-bg">
          <div className="section-inner">
            <div ref={toolsReveal.ref} className={`reveal ${toolsReveal.visible ? "visible" : ""}`}>
              <p className="section-label">Software & tools</p>
              <h2 className="section-heading">I already know your stack</h2>
              <p className="section-sub">No ramp-up time. I'm familiar with the tools most STR operators use day to day.</p>

              {/* PMS & Booking — text-badge style (no official SVG available) */}
              <p className="tools-cat-label" style={{ marginBottom: "0.75rem" }}>PMS & Channel Managers</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
                {[
                  { name: "Guesty", bg: "#0A2540", color: "#fff" },
                  { name: "Hostaway", bg: "#1B3A6B", color: "#fff" },
                  { name: "Breezeway", bg: "#00B4A6", color: "#fff" },
                  { name: "Ensoconnect", bg: "#6C3FC5", color: "#fff" },
                ].map((t) => (
                  <span key={t.name} style={{
                    background: t.bg, color: t.color,
                    fontSize: "0.78rem", fontWeight: 700,
                    padding: "0.45rem 1rem", borderRadius: "6px",
                    letterSpacing: "0.02em", fontFamily: "'Inter', sans-serif",
                  }}>{t.name}</span>
                ))}
              </div>

              {/* Booking platforms — Simple Icons SVGs inline */}
              <p className="tools-cat-label" style={{ marginBottom: "0.75rem" }}>Booking Platforms</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
                {/* Airbnb */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#fff", border: "1px solid #E8E0D5", borderRadius: "8px", padding: "0.5rem 0.9rem" }}>
                  <svg role="img" viewBox="0 0 24 24" width="18" height="18" fill="#FF5A5F" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9994 0C5.3726 0 0 5.3726 0 11.9994c0 6.6278 5.3726 12.0006 11.9994 12.0006C18.6278 24 24 18.6272 24 11.9994 24 5.3726 18.6278 0 11.9994 0zm-.3625 3.7897c.4998-.767 1.2244-.767 1.7242 0l5.0928 7.7983c.4998.767.2166 1.394-.6288 1.394H7.173c-.845 0-1.1286-.627-.6288-1.394zM19.2 17.604c0 2.052-1.6434 3.7175-3.6717 3.7175-1.3193 0-2.4633-.699-3.1213-1.7408a3.6626 3.6626 0 0 1-3.1208 1.7408c-2.0283 0-3.6712-1.6655-3.6712-3.7175 0-1.0248.4183-1.9534 1.0944-2.623l3.6284-3.9339.4684.7172-2.7954 3.0327c-.4484.4864-.7218 1.138-.7218 1.8075 0 1.5028 1.2013 2.7203 2.682 2.7203a2.6614 2.6614 0 0 0 2.3394-1.3975l.2966-.5385.2966.5385a2.6614 2.6614 0 0 0 2.3394 1.3975c1.4807 0 2.682-1.2175 2.682-2.7203 0-.6695-.2734-1.3211-.7218-1.8075l-2.7954-3.0327.4684-.7172 3.6284 3.9339c.676.6696 1.0944 1.5982 1.0944 2.623z"/>
                  </svg>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1C1C1E" }}>Airbnb</span>
                </div>
                {/* Vrbo */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#fff", border: "1px solid #E8E0D5", borderRadius: "8px", padding: "0.5rem 0.9rem" }}>
                  <svg role="img" viewBox="0 0 24 24" width="18" height="18" fill="#1A5276" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#1A5276"/>
                    <text x="3" y="17" fontSize="11" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">vrbo</text>
                  </svg>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1C1C1E" }}>Vrbo</span>
                </div>
                {/* Booking.com */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#fff", border: "1px solid #E8E0D5", borderRadius: "8px", padding: "0.5rem 0.9rem" }}>
                  <svg role="img" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#003580" d="M22.617 0H1.383C.619 0 0 .619 0 1.383v21.234C0 23.381.619 24 1.383 24h21.234C23.381 24 24 23.381 24 22.617V1.383C24 .619 23.381 0 22.617 0zM8.15 18.169H5.66V7.808H8.15v10.361zm5.18 0h-2.49V7.808h2.49v10.361zm5.18 0h-2.49V7.808h2.49v10.361z"/>
                  </svg>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1C1C1E" }}>Booking.com</span>
                </div>
              </div>

              {/* Workflow tools — Simple Icons */}
              <p className="tools-cat-label" style={{ marginBottom: "0.75rem" }}>Workflow & Productivity</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
                {/* Asana */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#fff", border: "1px solid #E8E0D5", borderRadius: "8px", padding: "0.5rem 0.9rem" }}>
                  <svg role="img" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#F06A6A" d="M18.814 9.761a5.186 5.186 0 1 1-10.372 0 5.186 5.186 0 0 1 10.372 0zM5.186 14.239a5.186 5.186 0 1 0 0 10.372 5.186 5.186 0 0 0 0-10.372zm13.628 0a5.186 5.186 0 1 0 0 10.372 5.186 5.186 0 0 0 0-10.372z"/>
                  </svg>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1C1C1E" }}>Asana</span>
                </div>
                {/* Slack */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#fff", border: "1px solid #E8E0D5", borderRadius: "8px", padding: "0.5rem 0.9rem" }}>
                  <svg role="img" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4A154B" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                  </svg>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1C1C1E" }}>Slack</span>
                </div>
                {/* Notion */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#fff", border: "1px solid #E8E0D5", borderRadius: "8px", padding: "0.5rem 0.9rem" }}>
                  <svg role="img" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#000000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
                  </svg>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1C1C1E" }}>Notion</span>
                </div>
                {/* Canva */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#fff", border: "1px solid #E8E0D5", borderRadius: "8px", padding: "0.5rem 0.9rem" }}>
                  <svg role="img" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#00C4CC" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm2.455 15.275c-.484.334-1.168.557-1.926.557-1.854 0-3.083-1.23-3.083-3.296 0-2.135 1.407-3.644 3.316-3.644.743 0 1.37.216 1.802.528.16.117.2.326.092.495l-.484.761c-.11.173-.327.216-.503.107-.278-.17-.6-.267-.935-.267-.99 0-1.648.803-1.648 2.02 0 1.19.641 1.956 1.641 1.956.368 0 .699-.099.974-.28.177-.114.404-.072.51.103l.457.755c.103.17.054.39-.213.505z"/>
                  </svg>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1C1C1E" }}>Canva</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section" style={{ background: "#FAF7F2" }}>
          <div className="section-inner">
            <div ref={contactReveal.ref} className={`reveal ${contactReveal.visible ? "visible" : ""}`}>
              <div className="contact-wrap">
                <div>
                  <p className="section-label">Get in touch</p>
                  <h2 className="section-heading">Let's work together</h2>
                  <p style={{ fontSize: "0.88rem", color: "#6b7280", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    Tell me about your property and where things are slipping — I'll reply within 24 hours.
                  </p>

                  {/* Social links */}
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
                    <a href="https://www.instagram.com/vonstrva/" target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#fff", border: "1px solid #E8E0D5", borderRadius: "8px", padding: "0.45rem 0.85rem", textDecoration: "none", transition: "border-color 0.2s" }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f09433"/>
                            <stop offset="25%" stopColor="#e6683c"/>
                            <stop offset="50%" stopColor="#dc2743"/>
                            <stop offset="75%" stopColor="#cc2366"/>
                            <stop offset="100%" stopColor="#bc1888"/>
                          </linearGradient>
                        </defs>
                        <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                      </svg>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1C1C1E" }}>@vonstrva</span>
                    </a>
                    <a href="mailto:vonwrkspace@gmail.com"
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#fff", border: "1px solid #E8E0D5", borderRadius: "8px", padding: "0.45rem 0.85rem", textDecoration: "none" }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="#2D6A6A" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1C1C1E" }}>vonwrkspace@gmail.com</span>
                    </a>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Your name or property name</label>
                      <input className="form-input" type="text" name="name" required placeholder="Ocean Breeze Villa" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email address</label>
                      <input className="form-input" type="email" name="email" required placeholder="you@email.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea className="form-input" name="message" rows={4} required
                        placeholder="Tell me about your property, pain points, or goals…"
                        style={{ resize: "none" }} />
                    </div>
                    <button className="form-submit" type="submit" disabled={status === "loading"}>
                      {status === "loading" ? "Sending…" : "Send message"}
                    </button>
                    {status === "success" && (
                      <p style={{ fontSize: "0.82rem", color: "#2D6A6A", textAlign: "center", marginTop: "0.75rem" }}>
                        Message sent — I'll be in touch soon.
                      </p>
                    )}
                    {status === "error" && (
                      <p style={{ fontSize: "0.82rem", color: "#C4755A", textAlign: "center", marginTop: "0.75rem" }}>
                        Something went wrong. Try again.
                      </p>
                    )}
                  </form>
                </div>

                <div className="contact-img-wrap">
                  <img
                    className="contact-img"
                    src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80"
                    alt="Beachfront property at sunset"
                  />
                  <div className="contact-img-tag">
                    <span className="contact-img-tag-dot" />
                    Available for new clients
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <span>© 2025 Von Untalan · STR VA & Operations Specialist</span>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <a href="https://www.instagram.com/vonstrva/" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path fill="#8ecece" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <span>@vonstrva</span>
            </a>
            <a href="mailto:vonwrkspace@gmail.com" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#8ecece" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>vonwrkspace@gmail.com</span>
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}