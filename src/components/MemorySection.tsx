"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MEMORY_SECTIONS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function MemorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const image = section.querySelector('.memory-image');
        const textContainer = section.querySelector('.memory-text');
        
        // Parallax effect for image
        gsap.fromTo(image, 
          { y: -50, scale: 1.1 },
          {
            y: 50,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
        
        // Fade and slide up for text
        gsap.fromTo(textContainer,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "top 30%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-20 flex flex-col gap-32">
      {MEMORY_SECTIONS.map((section, index) => (
        <div 
          key={section.id} 
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={el => sectionsRef.current[index] = el}
          className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 px-4 md:px-20 ${
            index % 2 !== 0 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] overflow-hidden rounded-lg relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={section.image} 
              alt={section.title}
              className="memory-image w-full h-full object-cover"
              style={section.style}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
          
          <div className="memory-text w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-md tracking-tight">
              {section.title}
            </h2>
            <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
