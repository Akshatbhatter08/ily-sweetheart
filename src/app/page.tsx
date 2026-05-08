"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fallback timer just in case video doesn't play or end event fails
    const timer = setTimeout(() => {
      transitionOut();
    }, 6000); // Intro is usually ~4-5 seconds

    return () => clearTimeout(timer);
  }, []);

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
          <video
            ref={videoRef}
            src="/netflix intro.mp4"
            autoPlay
            playsInline
            onEnded={transitionOut}
            className="w-full h-full object-contain md:object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
