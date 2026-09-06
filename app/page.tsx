"use client";
import React, { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<string | null>(null);

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
      
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-neutral-900">
      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 bg-stone-950/90 backdrop-blur-md border-b border-stone-900 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-amber-500">Von Untalan <span className="text-stone-400 font-normal">| STR VA</span></h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
            <a href="#services" className="hover:text-amber-500 transition-colors">Services</a>
            <a href="#tools" className="hover:text-amber-500 transition-colors">Tech Stack</a>
            <a href="#portfolio" className="hover:text-amber-500 transition-colors">My Work</a>
            <a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="about" className="pt-40 pb-24 px-6 max-w-4xl mx-auto text-center">
        <span className="text-amber-500 text-xs font-semibold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Available for Remote Projects</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight text-stone-100">
          Streamlining Operations & Elevating Guest Experiences for <span className="italic text-amber-400">Short-Term Rentals</span>
        </h2>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Hi, I am an expert Short-Term Rental Virtual Assistant. I help property hosts automate workflows, optimize multi-channel listings, and manage daily operations smoothly to maximize passive revenue.
        </p>
        <a href="#contact" className="inline-block bg-amber-500 text-neutral-950 font-bold px-8 py-3.5 rounded hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/10">
          Book an Operations Audit
        </a>
      </section>

      {/* CORE SERVICES */}
      <section id="services" className="py-20 bg-stone-900/40 px-6 border-y border-stone-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">Expertise & Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-900 p-6 rounded-lg border border-stone-800">
              <div className="text-amber-500 text-2xl mb-3">🛎️</div>
              <h4 className="text-lg font-bold mb-2">Multi-Channel Operations</h4>
              <p className="text-stone-400 text-sm leading-relaxed">Synchronizing listing profiles across leading channels, updating booking rates, and managing seamless unified inboxes to protect hospitality metrics.</p>
            </div>
            <div className="bg-stone-900 p-6 rounded-lg border border-stone-800">
              <div className="text-amber-500 text-2xl mb-3">🧹</div>
              <h4 className="text-lg font-bold mb-2">Turnover Coordination</h4>
              <p className="text-stone-400 text-sm leading-relaxed">Structuring field-staff assignments, tracking cleaning logs, and monitoring property maintenance workflows to verify 5-star readiness.</p>
            </div>
            <div className="bg-stone-900 p-6 rounded-lg border border-stone-800">
              <div className="text-amber-500 text-2xl mb-3">⚙️</div>
              <h4 className="text-lg font-bold mb-2">SOPs & Guest Guidebooks</h4>
              <p className="text-stone-400 text-sm leading-relaxed">Building interactive check-in instructions, onboarding configurations, digital guidebooks, and structural administrative databases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERT TOOLS STACK */}
      <section id="tools" className="py-20 px-6 max-w-5xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-center mb-4">Software & Tech Stack</h3>
        <p className="text-stone-400 text-center text-sm max-w-md mx-auto mb-12">Proficient in specialized hospitality software, channel systems, and production platforms.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-stone-900 rounded border border-stone-800">
            <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">PMS & Channel Managers</h4>
            <ul className="space-y-1 text-sm text-stone-300">
              <li>• Guesty</li>
              <li>• Hostaway</li>
            </ul>
          </div>
          <div className="p-4 bg-stone-900 rounded border border-stone-800">
            <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">STR Booking Channels</h4>
            <ul className="space-y-1 text-sm text-stone-300">
              <li>• Airbnb</li>
              <li>• Vrbo</li>
              <li>• Booking.com</li>
            </ul>
          </div>
          <div className="p-4 bg-stone-900 rounded border border-stone-800">
            <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">Operations & Field Management</h4>
            <ul className="space-y-1 text-sm text-stone-300">
              <li>• Ensoconnect</li>
              <li>• Breezeway</li>
            </ul>
          </div>
          <div className="p-4 bg-stone-900 rounded border border-stone-800">
            <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">Productivity & Design</h4>
            <ul className="space-y-1 text-sm text-stone-300">
              <li>• Asana / Slack</li>
              <li>• Notion</li>
              <li>• Canva</li>
            </ul>
          </div>
        </div>
      </section>

      {/* STR VA PORTFOLIO / CASE STUDIES */}
      <section id="portfolio" className="py-20 bg-stone-900/40 px-6 border-t border-stone-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-center mb-4">Case Studies & Operational Samples</h3>
          <p className="text-stone-400 text-center text-sm max-w-md mx-auto mb-12">A look inside the workflows and asset management layouts I run for current properties.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-stone-900 rounded-lg overflow-hidden border border-stone-800 p-6">
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">Project Framework 1</span>
              <h4 className="text-xl font-bold mt-1 mb-2">Automated Guest Communication Pipeline</h4>
              <p className="text-stone-400 text-sm mb-4">Configured smart message templates, localized check-in auto-triggers, and emergency response frameworks to bring response times under 5 minutes.</p>
              <div className="flex gap-2"><span className="text-xs bg-stone-950 text-stone-300 px-2.5 py-1 rounded border border-stone-800">Guesty / Hostaway</span></div>
            </div>
            <div className="bg-stone-900 rounded-lg overflow-hidden border border-stone-800 p-6">
              <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">Project Framework 2</span>
              <h4 className="text-xl font-bold mt-1 mb-2">Turnover & Cleaning Management System</h4>
              <p className="text-stone-400 text-sm mb-4">Designed custom property profiles, task boards, and automated turnover tracking triggers to guarantee zero-miss scheduling profiles.</p>
              <div className="flex gap-2"><span className="text-xs bg-stone-950 text-stone-300 px-2.5 py-1 rounded border border-stone-800">Breezeway / Asana</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / INQUIRY FORM */}
      <section id="contact" className="py-20 px-6 max-w-lg mx-auto my-12 bg-stone-900 rounded-xl border border-stone-800">
        <h3 className="text-2xl font-serif font-bold text-center mb-2">Automate Your Rental Properties</h3>
        <p className="text-stone-400 text-center text-sm mb-8">Looking to hire property support or save hours on management? Leave a message below to connect!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-stone-400">Your Name / Host Name</label>
            <input type="text" name="name" required className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-white focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-stone-400">Email Address</label>
