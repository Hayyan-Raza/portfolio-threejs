import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

function DoodlePath({ position, scale, color, speed, points }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a smooth curve from the random points
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      points.map((p: number[]) => new THREE.Vector3(...p)),
      false, // open curve
      'catmullrom',
      0.5 // tension
    );
  }, [points]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.005;
      meshRef.current.rotation.y += speed * 0.005;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.005;
    }
  });

  return (
    <group position={position} scale={scale}>
      <Float speed={speed * 2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={meshRef}>
          {/* path, segments, radius, radial segments, closed */}
          <tubeGeometry args={[curve, 32, 0.2, 16, false]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.2} 
            metalness={0.1}
            transparent 
            opacity={0.8} 
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function BackgroundDoodles() {
  const doodles = useMemo(() => {
    const items = [];
    // Awwwards style electric colors + white/gray
    const colors = ['#a855f7', '#3b82f6', '#ffffff', '#222222', '#ff3366', '#33ffaa'];
    
    for (let i = 0; i < 35; i++) {
      // Generate 4 to 5 random points to create a random organic squiggle
      const pts = [];
      let currentPoint = new THREE.Vector3(0, 0, 0);
      pts.push([currentPoint.x, currentPoint.y, currentPoint.z]);
      
      const numPoints = Math.floor(Math.random() * 3) + 3; // 3 to 5 points
      
      for(let j = 0; j < numPoints; j++) {
        currentPoint = currentPoint.clone().add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3
          )
        );
        pts.push([currentPoint.x, currentPoint.y, currentPoint.z]);
      }

      items.push({
        id: i,
        points: pts,
        position: [
          (Math.random() - 0.5) * 25, // Spread wide
          (Math.random() - 0.5) * 25, // Spread high
          (Math.random() - 0.5) * 15 - 2 // Pushed back slightly
        ],
        scale: Math.random() * 0.4 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.8 + 0.2,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {/* Ensure the tubes catch some light even if the main scene lights don't hit them directly */}
      <ambientLight intensity={0.4} />
      {doodles.map((d) => (
        <DoodlePath key={d.id} {...d} />
      ))}
    </group>
  );
}
