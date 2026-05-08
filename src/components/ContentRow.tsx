"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
  id: string;
  title: string;
  image: string;
  match: string;
  duration: string;
  style?: React.CSSProperties;
}

interface ContentRowProps {
  title: string;
  items: Item[];
}

export default function ContentRow({ title, items }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCard(id);
    }, 100); // 400ms delay before pop out
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredCard(null);
  };

  const smoothScroll = (element: HTMLElement, targetLeft: number, duration: number) => {
    const startLeft = element.scrollLeft;
    const distance = targetLeft - startLeft;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      element.scrollLeft = startLeft + distance * ease;

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const smoothScrollToStory = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const target = document.getElementById('our-story');
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
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

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      smoothScroll(rowRef.current, scrollTo, 1000); // 1000ms duration for slow smooth scroll
    }
  };

  return (
    <div className="space-y-0.5 md:space-y-2 mt-4 md:mt-8 px-4 md:px-12 group/row">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <div className="group relative md:-ml-2">
        <ChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-[60] m-auto h-12 w-12 cursor-pointer opacity-0 transition hover:scale-125 group-hover/row:opacity-100 bg-black/60 rounded-full p-2 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-2 md:space-x-3 overflow-x-scroll scrollbar-hide py-4 md:py-8"
        >
          {/* Create a large array to simulate infinite wrapping */}
          {[...items, ...items, ...items, ...items, ...items].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative h-40 min-w-[200px] md:h-64 md:min-w-[320px] cursor-pointer transition-transform duration-200"
              onMouseEnter={() => handleMouseEnter(`${item.id}-${index}`)}
              onMouseLeave={handleMouseLeave}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                className="rounded-sm object-cover md:rounded h-full w-full"
                style={item.style || { objectPosition: "center" }}
                alt={item.title}
              />

              <AnimatePresence>
                {hoveredCard === `${item.id}-${index}` && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1.15 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-6 -left-6 z-50 w-64 md:w-[380px] h-auto bg-[#181818] rounded-md shadow-2xl overflow-hidden"
                  >
                    <div className="relative h-40 md:h-[240px] w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        className="object-cover w-full h-full"
                        style={item.style || { objectPosition: "center" }}
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
                      <h3 className="absolute bottom-3 left-4 font-bold text-white text-xl md:text-2xl drop-shadow-md">
                        {item.title}
                      </h3>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <button 
                            onClick={smoothScrollToStory}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-white/80 transition"
                          >
                            <Play className="h-4 w-4 fill-black ml-0.5" />
                          </button>
                          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 bg-[#2a2a2a]/60 text-white hover:border-white transition">
                            <Plus className="h-4 w-4" />
                          </button>
                          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 bg-[#2a2a2a]/60 text-white hover:border-white transition">
                            <ThumbsUp className="h-4 w-4" />
                          </button>
                        </div>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 bg-[#2a2a2a]/60 text-white hover:border-white transition">
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-white">
                        <span className="font-semibold text-green-400">{item.match}</span>
                        <span className="border border-white/40 px-1 text-[10px] text-white/80 uppercase">U/A 16+</span>
                        <span className="text-gray-300">{item.duration}</span>
                        <span className="flex h-4 items-center justify-center rounded border border-white/40 px-1 text-[10px]">HD</span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-white">
                        <span className="text-gray-300">Emotional</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-300">Heartfelt</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-300">Cinematic</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <ChevronRight
          className="absolute top-0 bottom-0 right-2 z-[60] m-auto h-12 w-12 cursor-pointer opacity-0 transition hover:scale-125 group-hover/row:opacity-100 bg-black/60 rounded-full p-2"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
