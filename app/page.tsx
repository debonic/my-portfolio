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
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <header className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-lime-400">My Portfolio</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#home" className="hover:text-lime-400 transition-colors">Home</a>
            <a href="#projects" className="hover:text-lime-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-lime-400 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <section id="home" className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
          Hi, {"I'm"} a <span className="text-lime-400">Full-Stack Developer</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          I build clean, secure, and responsive web applications. Welcome to my beginner portfolio capstone project deployed on Vercel!
        </p>
        <a href="#contact" className="inline-block bg-lime-400 text-slate-950 font-bold px-6 py-3 rounded-full hover:bg-lime-300 transition-colors">
          {"Let's"} Work Together
        </a>
      </section>

      <section id="projects" className="py-20 bg-slate-950 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-lime-400/50 transition-colors">
              <h4 className="text-xl font-bold mb-2">Weather Dashboard</h4>
              <p className="text-slate-400 text-sm mb-4">Real-time weather app with geolocation & data fetching APIs.</p>
              <div className="flex gap-2 mb-4"><span className="text-xs bg-slate-800 text-lime-400 px-2 py-1 rounded">React</span></div>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-lime-400/50 transition-colors">
              <h4 className="text-xl font-bold mb-2">TaskManager Pro</h4>
              <p className="text-slate-400 text-sm mb-4">Full-stack project tracker with backend logic and authentication.</p>
              <div className="flex gap-2 mb-4"><span className="text-xs bg-slate-800 text-lime-400 px-2 py-1 rounded">Next.js</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 max-w-lg mx-auto">
        <h3 className="text-3xl font-bold text-center mb-4">Get In Touch</h3>
        <p className="text-slate-400 text-center text-sm mb-8">Leave a message below and it will be saved directly into my MongoDB database!</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-400">Name</label>
            <input type="text" name="name" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-lime-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-400">Email</label>
            <input type="email" name="email" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-lime-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-400">Message</label>
            <textarea name="message" rows={4} required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-lime-400"></textarea>
          </div>
          <button type="submit" disabled={status === "loading"} className="w-full bg-lime-400 text-slate-950 font-bold p-3 rounded-lg hover:bg-lime-300 transition-colors disabled:opacity-50">
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          
          {status === "success" && <p className="text-emerald-400 text-sm text-center">✅ Message saved to database!</p>}
          {status === "error" && <p className="text-rose-400 text-sm text-center">❌ Something went wrong. Try again.</p>}
        </form>
      </section>
    </div>
  );
}
