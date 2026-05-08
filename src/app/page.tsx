"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const transitionOut = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      router.push("/browse/profiles");
    }, 1000); // 1s fade duration
  };

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          className="fixed inset-0 bg-netflix-black flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {!hasStarted ? (
            <div className="flex flex-col items-center gap-8 z-10">
              <h1 className="text-3xl md:text-5xl font-light text-white tracking-widest text-center px-4 drop-shadow-xl">
                Are you ready?
              </h1>
              <button 
                onClick={() => {
                  setHasStarted(true);
                  // Start fallback timer
                  setTimeout(() => transitionOut(), 6000);
                }}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-xl transition-all hover:scale-105"
              >
                Click to Begin
              </button>
            </div>
          ) : (
            <video
              src="/netflix intro.mp4"
              autoPlay
              playsInline
              onEnded={transitionOut}
              className="absolute inset-0 w-full h-full object-contain md:object-cover"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
