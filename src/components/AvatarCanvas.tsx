import Spline from '@splinetool/react-spline';
import { useState } from 'react';

export default function AvatarCanvas() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center rounded-2xl overflow-hidden max-w-2xl mx-auto group">
      {/* Dynamic Glow Behind the Spline */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20 rounded-full filter blur-[100px] pointer-events-none -z-10 group-hover:blur-[120px] transition-all duration-700" />
      
      {isLoading && (
        <div className="absolute flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-16 h-16 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin" />
          <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase animate-pulse">
            Booting 3D Vector Core...
          </p>
        </div>
      )}

      <Spline 
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
        onLoad={() => setIsLoading(false)}
        className="w-full h-full scale-[1.0] md:scale-[1.2] cursor-grab active:cursor-grabbing"
      />
      
      {/* Telemetry Data */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-500 flex flex-col space-y-1 pointer-events-none mix-blend-screen">
        <div>SYS_MODEL: SPLINE_INTERACTIVE_CORE</div>
        <div>RENDER_MODE: WEBGL_REALTIME</div>
        <div>STATUS: ACTIVE & TRACKING</div>
      </div>
    </div>
  );
}
