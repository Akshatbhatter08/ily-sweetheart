"use client";

import { PROFILES } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function ProfilesPage() {
  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl px-4 flex flex-col items-center"
      >
        <h1 className="text-white text-3xl md:text-5xl font-medium mb-10 tracking-wide text-center">
          Who's watching?
        </h1>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {PROFILES.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <Link href={`/browse?profile=${profile.name.toLowerCase()}`} className="group flex flex-col items-center">
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-md overflow-hidden border-[3px] border-transparent group-hover:border-white transition-all duration-300 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
                  <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      style={profile.style}
                    />
                  </div>
                </div>
                <span className="text-gray-400 mt-4 text-sm md:text-lg group-hover:text-white transition-colors duration-300">
                  {profile.name}
                </span>
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: PROFILES.length * 0.1 + 0.3 }}
          >
            <div 
              className="group flex flex-col items-center cursor-pointer"
              onClick={() => window.alert("Want a little one so soon, eh? haha")}
            >
              <div className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center rounded-md border-2 border-transparent group-hover:bg-white/10 transition-all duration-300">
                <PlusCircle className="text-gray-400 w-12 h-12 md:w-16 md:h-16 group-hover:text-white transition-colors" />
              </div>
              <span className="text-gray-400 mt-4 text-sm md:text-lg group-hover:text-white transition-colors duration-300">
                Add Profile
              </span>
            </div>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="border border-gray-500 text-gray-500 px-6 py-2 uppercase tracking-widest text-sm hover:text-white hover:border-white transition-colors duration-300"
        >
          Manage Profiles
        </motion.button>
      </motion.div>
    </div>
  );
}
