"use client";
import React, { useState } from "react";

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
      {/* ... YOUR HEADER, HERO, SERVICES, TOOLS, PORTFOLIO SECTIONS ... */}

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
            <input type="email" name="email" required className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-white focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-stone-400">Message</label>
            <textarea name="message" rows={4} required className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-white focus:outline-none focus:border-amber-500 resize-none"></textarea>
          </div>
          <button type="submit" className="inline-block bg-amber-500 text-neutral-950 font-bold px-8 py-3.5 rounded hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/10">
            Send Message
          </button>
          {/* Status feedback */}
          {status && <p className="text-center mt-2 text-amber-400">{status === "success" ? "✅ Message sent!" : "❌ Something went wrong."}</p>}
        </form>
      </section>

      {/* ... REST OF YOUR PAGE ... */}
    </div>
  );
}
