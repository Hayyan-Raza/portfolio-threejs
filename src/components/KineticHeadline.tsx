import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function KineticHeadline() {
  const filterRef = useRef<SVGFEDisplacementMapElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filter = filterRef.current;
    const container = containerRef.current;
    if (!filter || !container) return;

    const tl = gsap.timeline({ paused: true });
    
    tl.to(filter, {
      attr: { scale: 80 },
      duration: 0.4,
      ease: "power2.out"
    }).to(filter, {
      attr: { scale: 0 },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    });

    const onMouseEnter = () => tl.restart();

    // Adding event listener to a wider container for better trigger area
    container.addEventListener('mouseenter', onMouseEnter);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div className="relative z-0 pointer-events-auto" ref={containerRef}>
      {/* SVG Filter Definition for the advanced warp/ripple effect */}
      <svg className="hidden">
        <filter id="kinetic-distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
          <feDisplacementMap ref={filterRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <h1 
        className="font-display text-[10vw] sm:text-[8vw] font-black tracking-tighter leading-[0.85] text-white uppercase text-center md:text-left mix-blend-difference"
        style={{ filter: "url(#kinetic-distort)" }}
      >
        <span className="block hover:text-[#a855f7] transition-colors duration-700 ease-out cursor-default">Building</span>
        <span 
          className="block text-transparent hover:text-white transition-colors duration-700 ease-out cursor-default"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}
        >
          Autonomous
        </span>
        <span className="block hover:text-[#3b82f6] transition-colors duration-700 ease-out cursor-default">Systems</span>
      </h1>
    </div>
  );
}
