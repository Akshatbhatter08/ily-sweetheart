"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RollingCredits() {
  const creditsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the credits section as it enters the viewport
      gsap.fromTo(
        creditsRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          scrollTrigger: {
            trigger: creditsRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, creditsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={creditsRef}
      className="min-h-screen bg-black flex flex-col items-center justify-center py-32 px-4 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-netflix-red/10 via-black to-black opacity-50" />
      
      <div className="z-10 max-w-2xl mx-auto space-y-16">
        <div>
          <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-2 font-light">Starring</h3>
          <p className="text-white text-2xl md:text-4xl font-serif">Mantasha & Akshat</p>
        </div>

        <div>
          <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-2 font-light">Directed By</h3>
          <p className="text-white text-xl md:text-3xl font-serif">Destiny</p>
        </div>

        <div>
          <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-2 font-light">Original Soundtrack</h3>
          <p className="text-white text-xl md:text-3xl font-serif">Every song that reminds me of you</p>
        </div>

        <div className="pt-20">
          <p className="text-netflix-red text-2xl md:text-4xl italic font-serif opacity-90">
            "To be continued..."
          </p>
        </div>
      </div>
      
      {/* Netflix Logo Footer */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-50">
        <span className="text-netflix-red font-bold text-3xl tracking-tighter uppercase">Netflix</span>
      </div>
    </div>
  );
}
