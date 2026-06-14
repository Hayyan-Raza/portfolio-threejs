import React, { useEffect, useRef, useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import HeroScene from "./components/HeroScene";
import KineticHeadline from "./components/KineticHeadline";
import GlassText from "./components/GlassText";
import { PROJECTS, HAYYAN_BIO, SERVICES, SKILL_CATEGORIES, STATISTICS, EXPERIENCE_TIMELINE, SCREENSHOT_GALLERY } from "./data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ErrorBoundary } from "react-error-boundary";

gsap.registerPlugin(ScrollTrigger);

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-red-900 text-white p-10 font-mono">
      <h2 className="text-4xl mb-4 font-bold">REACT CRASH DETECTED</h2>
      <pre className="bg-black/50 p-6 rounded-lg text-sm max-w-4xl overflow-auto w-full">
        {error.message}
        {"\n\n"}
        {error.stack}
      </pre>
      <button onClick={resetErrorBoundary} className="mt-8 px-6 py-2 bg-white text-black font-bold">Try Again</button>
    </div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(6);

  useEffect(() => {
    // Hero reveal
    const tl = gsap.timeline();
    tl.fromTo(
      ".reveal-up",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.5 }
    );

    // Scroll Animations for sections
    const sections = gsap.utils.toArray<HTMLElement>('.fade-section');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 100 },
        {
          opacity: 1, y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SmoothScroll>
        <div ref={containerRef} className="bg-[#050505] text-[#f2f2f2] font-sans selection:bg-[#a855f7] selection:text-white min-h-screen relative overflow-hidden">
          <CustomCursor />

          {/* Global Navigation - Minimalist */}
          <header className="fixed top-0 inset-x-0 z-50 p-6 md:p-10 mix-blend-difference pointer-events-auto">
            <div className="flex items-center justify-between">
              <div className="font-display font-black text-xl tracking-tighter uppercase text-white reveal-up">
                {HAYYAN_BIO.name}<span className="opacity-50">.AI</span>
              </div>
              
              <nav className="hidden md:flex gap-10 font-mono text-[10px] uppercase tracking-widest text-white reveal-up">
                <a href="#about" className="hover:text-[#a855f7] transition-colors">Entity Profile</a>
                <a href="#capabilities" className="hover:text-[#3b82f6] transition-colors">Capabilities</a>
                <a href="#work" className="hover:text-[#a855f7] transition-colors">Selected Work</a>
                <a href="#contact" className="hover:opacity-50 transition-opacity">Initiate Contact</a>
              </nav>

              <a href="#contact" className="font-mono text-[10px] uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full hover:bg-[#a855f7] hover:border-[#a855f7] hover:text-white transition-colors duration-300 reveal-up text-white">
                Hire Me
              </a>
            </div>
          </header>

          {/* Massive 3D Hero Section */}
          <section className="relative w-full h-screen flex items-center justify-center overflow-hidden z-10">
            {/* Background Gradient Blurs */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-purple-600/10 rounded-full filter blur-[150px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full filter blur-[150px] -z-10 pointer-events-none" />

            <HeroScene />

            {/* Typography Layer - Overlaps the 3D model */}
            <div className="relative z-20 pointer-events-none w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-center h-full">
              <div className="reveal-up pointer-events-auto">
                <KineticHeadline />
              </div>

              <div className="mt-12 max-w-sm reveal-up pointer-events-auto mix-blend-difference">
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/50 leading-relaxed">
                  <span className="text-[#a855f7] block mb-2">SYSTEM.INIT()</span>
                  {HAYYAN_BIO.subheading}
                </p>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-6 md:left-10 font-mono text-[9px] uppercase tracking-widest text-white/40 reveal-up mix-blend-difference">
              <div className="flex flex-col items-center gap-4">
                <span className="-rotate-90 origin-left translate-y-8">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
              </div>
            </div>
          </section>

          {/* ABOUT SECTION (Entity Profile) */}
          <section id="about" className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto relative z-20 fade-section">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4">
                   <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] mb-4">01 // Entity Profile</h2>
                   <div className="w-12 h-[1px] bg-white/20 mb-10" />
                </div>
                <div className="md:col-span-8 -mt-10">
                   <GlassText text={HAYYAN_BIO.aboutText} />
                </div>
             </div>
          </section>

          {/* STATISTICS SECTION */}
          <section className="py-20 px-6 md:px-10 max-w-[1400px] mx-auto relative z-20 fade-section">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-y border-white/10 py-20">
                {STATISTICS.map((stat, i) => (
                   <div key={i} className="flex flex-col gap-2">
                     <span className="font-display text-5xl md:text-7xl font-black text-transparent stroke-text">{stat.value}</span>
                     <span className="font-mono text-xs uppercase tracking-widest text-[#a855f7]">{stat.label}</span>
                     <span className="font-mono text-[9px] text-white/40 uppercase">{stat.sub}</span>
                   </div>
                ))}
             </div>
          </section>

          {/* CAPABILITIES SECTION (Services & Skills) */}
          <section id="capabilities" className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto relative z-20 fade-section">
             <div className="mb-24">
               <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] mb-4">02 // System Capabilities</h2>
               <h3 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">
                 Core <span className="text-transparent stroke-text">Functions</span>
               </h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                {SERVICES.map((service, i) => (
                  <div key={i} className="border border-white/10 bg-black/40 backdrop-blur-sm p-8 hover:bg-white/[0.02] transition-colors group">
                    <div className="text-[#a855f7] mb-6 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                      OP_{String(i+1).padStart(2, '0')}
                    </div>
                    <h4 className="font-display text-2xl font-bold uppercase tracking-tight mb-4">{service.title}</h4>
                    <p className="font-mono text-[10px] text-white/50 leading-relaxed mb-8">{service.description}</p>
                    <ul className="flex flex-col gap-2">
                      {service.features.map((feature, j) => (
                        <li key={j} className="font-mono text-[9px] uppercase tracking-widest text-white/70 flex items-start gap-2">
                          <span className="text-[#a855f7] mt-[2px]">▹</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {SKILL_CATEGORIES.map((cat, i) => (
                  <div key={i}>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6 border-b border-white/10 pb-4">{cat.name}</h4>
                    <ul className="flex flex-col gap-4">
                      {cat.skills.map((skill, j) => (
                        <li key={j} className="font-mono text-[10px] uppercase tracking-widest text-white/80">
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
             </div>
          </section>

          {/* EXPERIENCE TIMELINE */}
          <section id="experience" className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto relative z-20 fade-section">
             <div className="mb-24">
               <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] mb-4">03 // Deployment History</h2>
               <h3 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">
                 Operational <span className="text-transparent stroke-text">Logs</span>
               </h3>
             </div>

             <div className="flex flex-col gap-20">
                {EXPERIENCE_TIMELINE.map((exp, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-10 group">
                    <div className="md:col-span-3 flex flex-col pt-2">
                       <span className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7]">{exp.year}</span>
                    </div>
                    <div className="md:col-span-9 border-l border-white/10 pl-10 relative">
                       <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[#a855f7] opacity-20 group-hover:opacity-100 transition-opacity" />
                       <h4 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight mb-2">{exp.role}</h4>
                       <h5 className="font-mono text-xs text-white/50 mb-6">{exp.company}</h5>
                       <p className="font-mono text-[11px] text-white/70 leading-relaxed max-w-2xl mb-8">
                         {exp.description}
                       </p>
                       <ul className="flex flex-col gap-3">
                         {exp.achievements.map((ach, j) => (
                           <li key={j} className="font-mono text-[10px] text-white/50 flex items-start gap-3">
                             <span className="text-[#a855f7] mt-1">▹</span> {ach}
                           </li>
                         ))}
                       </ul>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Minimalist Projects Section */}
          <section id="work" className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto relative z-20 fade-section">
            <div className="mb-24">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] mb-4">04 // Case Studies</h2>
              <h3 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Selected <span className="text-transparent stroke-text">Operations</span>
              </h3>
            </div>

            <div className="flex flex-col gap-32">
              {PROJECTS.map((proj, idx) => (
                <div key={proj.id} className="group flex flex-col md:flex-row gap-10 items-center">
                  
                  {/* Project Image/Visual */}
                  <div className="w-full md:w-1/2 h-[400px] bg-[#111] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
                    {proj.image && (
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                      />
                    )}
                    {/* Decorative Project Number */}
                    <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-white/50">
                      OP_0{idx + 1}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="w-full md:w-1/2 flex flex-col items-start gap-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] border border-[#a855f7]/30 px-3 py-1 rounded-full">
                      {proj.category}
                    </span>
                    <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="font-mono text-xs text-white/50 leading-relaxed max-w-md">
                      {proj.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {proj.tech.slice(0, 4).map((t, i) => (
                        <span key={i} className="font-mono text-[9px] uppercase tracking-widest text-white/30 bg-white/5 px-2 py-1">
                          {t}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={proj.liveUrl || proj.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-8 font-mono text-[10px] uppercase tracking-widest text-white border-b border-white/30 pb-1 hover:border-white transition-colors flex items-center gap-2"
                    >
                      Initialize Demo <span className="text-[#a855f7]">&rarr;</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Screenshot Gallery Section */}
          <section id="architectures" className="py-32 px-6 md:px-10 max-w-[1400px] mx-auto relative z-20 fade-section">
            <div className="mb-24">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] mb-4">05 // System Architectures</h2>
              <h3 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Automation <span className="text-transparent stroke-text">Gallery</span>
              </h3>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {SCREENSHOT_GALLERY.slice(0, visibleGalleryCount).map((item, idx) => (
                <div key={item.id} className="break-inside-avoid relative group overflow-hidden border border-white/10 bg-[#0a0a0a]">
                  <div className="w-full relative overflow-hidden bg-[#111]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-auto opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7] block mb-3">
                      ARC_{String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="font-mono text-[10px] text-white/80 leading-relaxed uppercase tracking-wider">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {visibleGalleryCount < SCREENSHOT_GALLERY.length && (
              <div className="mt-16 flex justify-center">
                <button 
                  onClick={() => setVisibleGalleryCount(prev => prev + 6)}
                  className="group relative px-8 py-4 bg-transparent border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:border-white transition-colors duration-300 overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">Load More Operations</span>
                  <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
                </button>
              </div>
            )}
          </section>

          {/* Minimalist Footer */}
          <footer id="contact" className="py-20 px-6 md:px-10 border-t border-white/10 mt-32 relative z-20 fade-section">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <div>
                <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] mb-4">06 // Transmission</h2>
                <h3 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                  Let's <span className="text-transparent stroke-text hover:text-[#3b82f6] transition-colors duration-500 cursor-default">Connect</span>
                </h3>
                <a href="mailto:hayyanraza15916@gmail.com" className="font-mono text-sm md:text-base text-white/70 hover:text-white transition-colors block">
                  hayyanraza15916@gmail.com
                </a>
                <a href="tel:+923702003081" className="font-mono text-sm md:text-base text-white/70 hover:text-white transition-colors block mt-2">
                  +923702003081
                </a>
              </div>

              <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest text-white/50">
                <a href="https://github.com/Hayyan-Raza" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
                <a href="https://www.linkedin.com/in/hayyangamedev/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </ErrorBoundary>
  );
}
