import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function GlassOrb() {
  const mesh = useRef<THREE.Mesh>(null!);
  const { viewport, pointer } = useThree();

  useFrame(() => {
    const targetX = (pointer.x * viewport.width) / 2;
    const targetY = (pointer.y * viewport.height) / 2;
    
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.15);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.15);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 1.5]}>
      {/* Marble-sized orb */}
      <sphereGeometry args={[0.5, 64, 64]} />
      <MeshTransmissionMaterial 
        thickness={5}
        roughness={0}
        transmission={1}
        ior={1.2}
        chromaticAberration={0.04}
        backside={true}
        transparent={true}
        envMapIntensity={0.3}
        clearcoat={1}
      />
    </mesh>
  );
}

function Scene({ text }: { text: string }) {
  const { viewport } = useThree();
  // Significantly reduce the font size multipliers to prevent vertical clipping on many lines
  const fontSize = Math.min(viewport.width * 0.035, viewport.height * 0.05);
  const maxWidth = viewport.width * 0.9;

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={3} />
      
      {/* 3D WebGL Text that CAN be magnified */}
      <Text
        position={[0, 0, -2]}
        fontSize={fontSize}
        maxWidth={maxWidth}
        color="rgba(255, 255, 255, 0.85)"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        textAlign="left"
        anchorX="center"
        anchorY="center"
        lineHeight={1.5}
        letterSpacing={-0.02}
      >
        {text}
      </Text>

      <GlassOrb />
      <Environment preset="city" />
    </>
  );
}

export default function GlassText({ text }: { text: string }) {
  return (
    <div className="w-full h-[95vh] relative cursor-crosshair -mt-20">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene text={text} />
      </Canvas>
      <span className="sr-only">{text}</span>
    </div>
  );
}
