import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollDoodle() {
  const lineRefOuter = useRef<any>(null);
  const lineRefInner = useRef<any>(null);
  const scrollData = useRef({ progress: 0 });

  // Generate an organic 3D doodle path that wraps around the model
  const points = useMemo(() => {
    const pts = [];
    const numPoints = 150; // Points for the baseline curve
    
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      // create a helix/swirl around the Y axis
      const angle = t * Math.PI * 14; // 7 full turns
      
      // Radius varies organically
      const radius = 2.5 + Math.sin(t * Math.PI * 4) * 1.2;
      
      const x = Math.cos(angle) * radius;
      const y = -3 + t * 6; // moving bottom to top
      const z = Math.sin(angle) * radius;
      
      pts.push(new THREE.Vector3(x, y, z));
    }
    
    // Smooth the points out for a buttery curve
    const curve = new THREE.CatmullRomCurve3(pts);
    return curve.getPoints(1000); // 1000 segments for ultra-smooth rendering
  }, []);

  useEffect(() => {
    // We want the line to draw as the user scrolls down the entire page.
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // smooth the progress update for a buttery delay feel
        gsap.to(scrollData.current, { 
          progress: self.progress, 
          duration: 0.8, 
          ease: "power3.out" 
        });
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  useFrame(() => {
    const totalSegments = points.length - 1;
    // count determines how many segments of the Line2 geometry are drawn
    const count = Math.max(0, Math.floor(scrollData.current.progress * totalSegments));
    
    if (lineRefOuter.current && lineRefOuter.current.geometry) {
      lineRefOuter.current.geometry.instanceCount = count;
    }
    if (lineRefInner.current && lineRefInner.current.geometry) {
      lineRefInner.current.geometry.instanceCount = count;
    }
  });

  return (
    <group position={[0, -1.5, 0]}>
      {/* Outer Glow Line */}
      <Line
        ref={lineRefOuter}
        points={points}
        color="#a855f7" // Electric Purple
        lineWidth={8}
        transparent
        opacity={0.4}
      />
      {/* Inner Core Neon Line */}
      <Line
        ref={lineRefInner}
        points={points}
        color="#ffffff"
        lineWidth={2}
        transparent
        opacity={1}
      />
    </group>
  );
}
