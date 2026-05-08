"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface HeroBannerProps {
  title: string;
  description: string;
  videoUrl?: string | null;
  videoStyle?: React.CSSProperties;
}

const BeatingHeart = () => {
  return (
    <div className="absolute inset-0 z-0 flex flex-col md:flex-row items-center justify-center md:justify-end bg-[#0a0a0a] overflow-hidden gap-8 md:gap-16 pt-12 md:pt-0 pr-0 md:pr-24 lg:pr-32">
      {/* Background glow pulse */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2, 0.4, 0.2] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-red-600 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen"
      />
      
      {/* 3D Beating Heart */}
      <motion.div
        animate={{
          scale: [1.2, 1.3, 1.2, 1.25, 1.2], // Double beat (lub-dub)
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 flex-shrink-0"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_20px_50px_rgba(255,0,0,0.6)]"
        >
          <defs>
            <radialGradient id="heart3d" cx="30%" cy="30%" r="70%" fx="25%" fy="25%">
              <stop offset="0%" stopColor="#ffb3b3" />
              <stop offset="10%" stopColor="#ff1a1a" />
              <stop offset="40%" stopColor="#b30000" />
              <stop offset="100%" stopColor="#330000" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#heart3d)"
            filter="url(#glow)"
          />
        </svg>
      </motion.div>

      {/* Sweetheart Text */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="relative z-10 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-5xl font-light italic text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-red-600 drop-shadow-xl font-serif leading-tight">
          It beats for you<br />sweetheart.
        </h2>
      </motion.div>
    </div>
  );
};

export default function HeroBanner({ title, description, videoUrl, videoStyle }: HeroBannerProps) {
  const handleScrollToStory = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const target = document.getElementById('our-story');
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1500; // 1.5 seconds for a cinematic slow pull
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // easeInOutCubic
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <div className="relative w-full h-[85vh] sm:h-[95vh] text-white overflow-hidden">
      {/* Background Video or Heart */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {videoUrl ? (
          <video
            key={videoUrl}
            src={videoUrl}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
            style={videoStyle}
          />
        ) : (
          <BeatingHeart />
        )}
        {/* Cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-netflix-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-netflix-red font-bold text-xl tracking-tighter uppercase leading-none">N</span>
            <span className="text-gray-300 text-sm tracking-[0.2em] uppercase">Series</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 uppercase tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 drop-shadow-2xl">
            {title}
          </h1>
          
          <p className="text-sm md:text-lg text-gray-200 mb-6 max-w-lg drop-shadow-md font-light leading-snug">
            {description}
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={handleScrollToStory}
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-white text-black rounded font-semibold text-lg hover:bg-white/80 transition-colors duration-300"
            >
              <Play className="w-6 h-6 fill-black" />
              Play
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Age Rating Box */}
      <div className="absolute bottom-[20%] right-0 bg-black/60 border-l-[3px] border-white px-4 py-2 flex items-center hidden md:flex">
        <span className="text-white text-lg font-medium">U/A 16+</span>
      </div>
    </div>
  );
}
