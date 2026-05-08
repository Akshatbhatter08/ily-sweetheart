"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown } from "lucide-react";
import { PROFILES } from "@/lib/data";

export default function Navbar({ currentProfile = "mantasha" }: { currentProfile?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeProfile = PROFILES.find(p => p.name.toLowerCase() === currentProfile.toLowerCase()) || PROFILES[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 flex items-center justify-between px-4 md:px-12 py-4 md:py-5 ${
        isScrolled ? "bg-netflix-black" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center gap-8">
        <Link href={`/browse?profile=${activeProfile.name.toLowerCase()}`} className="text-netflix-red font-bold text-2xl tracking-tighter uppercase">
          Netflix
        </Link>
        <ul className="hidden md:flex gap-5 text-sm font-light">
          <li><Link href={`/browse?profile=${activeProfile.name.toLowerCase()}`} className="font-medium text-white hover:text-gray-300 transition">Home</Link></li>
          <li><Link href="#" className="text-gray-200 hover:text-gray-400 transition">TV Shows</Link></li>
          <li><Link href="#" className="text-gray-200 hover:text-gray-400 transition">Movies</Link></li>
          <li><Link href="#" className="text-gray-200 hover:text-gray-400 transition">New & Popular</Link></li>
          <li><Link href="#" className="text-gray-200 hover:text-gray-400 transition">My List</Link></li>
        </ul>
      </div>

      <div className="flex items-center gap-6">
        <Search className="w-5 h-5 text-white cursor-pointer" />
        <span className="hidden md:block text-sm text-white">Kids</span>
        <Bell className="w-5 h-5 text-white cursor-pointer" />
        
        <div className="flex items-center gap-2 cursor-pointer group relative">
          <div className="w-8 h-8 rounded-md overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeProfile.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-300" />
          
          <div className="absolute top-10 right-0 w-48 bg-black/90 border border-gray-800 rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            {PROFILES.map((profile) => (
              <Link href={`/browse?profile=${profile.name.toLowerCase()}`} key={profile.id} className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.image} alt={profile.name} className="w-6 h-6 rounded-sm object-cover" />
                <span className="text-xs text-white hover:underline">{profile.name}</span>
              </Link>
            ))}
            <div className="border-t border-gray-700 mt-2 pt-2 px-4 py-2 hover:underline">
              <Link href="/browse/profiles" className="text-xs text-white">Manage Profiles</Link>
            </div>
            <div className="px-4 py-2 hover:underline">
              <span className="text-xs text-white">Sign out of Netflix</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
