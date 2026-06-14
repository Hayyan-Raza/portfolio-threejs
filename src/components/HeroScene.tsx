import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollDoodle from './ScrollDoodle';

gsap.registerPlugin(ScrollTrigger);

function Model() {
  const { scene } = useGLTF('/model.glb');
  const group = useRef<THREE.Group>(null);
  const scrollData = useRef({ progress: 0 });

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // smooth the progress update for the model rotation
        gsap.to(scrollData.current, { 
          progress: self.progress, 
          duration: 1, 
          ease: "power3.out" 
        });
      }
    });
    return () => { st.kill(); };
  }, []);

  // Auto-rotate the model slowly + react to scroll
  useFrame((state) => {
    if (group.current) {
      // Base idle animation
      const idleY = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      const idleX = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      
      // Scroll-based rotation (spins it around to view different angles as you scroll down the page)
      const scrollRotY = scrollData.current.progress * Math.PI * 2; 
      
      group.current.rotation.y = idleY + scrollRotY;
      group.current.rotation.x = idleX;
      
      // Optionally shift it slightly to the right as we scroll down to make room for text
      group.current.position.x = THREE.MathUtils.lerp(0, 2, scrollData.current.progress);
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <primitive object={scene} scale={2.5} position={[0, -1.5, 0]} />
        <ScrollDoodle />
        
        {/* Minimalist Floating Annotation */}
        <Html position={[1.5, 1, 0]} wrapperClass="pointer-events-none z-10" center>
          <div className="flex flex-col text-[10px] font-mono text-white/50 uppercase tracking-widest border-l border-white/20 pl-3 backdrop-blur-md bg-black/20 p-2">
            <span>Primary Entity</span>
            <span className="text-white font-bold">ONLINE</span>
            <span className="text-[8px] mt-1 opacity-50">T: {new Date().getTime().toString().slice(-6)}</span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function SceneLights() {
  const lightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      // Make spotlight follow the mouse smoothly
      const x = (state.mouse.x * state.viewport.width) / 2;
      const y = (state.mouse.y * state.viewport.height) / 2;
      
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x * 2, 0.05);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y * 2 + 2, 0.05);
      lightRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#ffffff" />
      <spotLight 
        ref={lightRef}
        position={[0, 0, 8]} 
        angle={0.6} 
        penumbra={0.8} 
        intensity={3} 
        color="#a855f7" 
        castShadow
      />
      <spotLight 
        position={[-5, 5, -5]} 
        angle={0.8} 
        penumbra={1} 
        intensity={2} 
        color="#3b82f6" 
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]} style={{ pointerEvents: 'auto' }}>
        <SceneLights />
        <Model />
        <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/model.glb');
