export const PROFILES = [
  {
    id: "1",
    name: "Akshat",
    image: "/me_kgp.jpeg",
    style: { transform: "scale(1.55) translateY(-10%) translateX(1%)" },
  },
  {
    id: "2",
    name: "Mantasha",
    image: "/3.jpg",
    style: { transform: "scale(1.1) translateX(-5%) translateY(-2%)" },
  },
  {
    id: "3",
    name: "Us",
    image: "/9.jpg",
    style: { transform: "scale(1.05) translateY(5.5%) translateX(-2.3%)" },
  },
];

export const getProfileData = (profileName: string) => {
  const profile = profileName.toLowerCase();
  
  if (profile === "akshat") {
    return {
      hero: {
        title: "Life of Mantasha & Akshat",
        description: "A cinematic journey through our most beautiful moments. Press play to experience the magic of us all over again.",
        videoUrl: null,
        videoStyle: {},
      },
      rows: [
        {
          id: "row-1",
          title: "Popular on Netflix",
          items: [
            { id: "a1", title: "Memory 1", image: "/Akshat/akshat-1.jpeg", match: "100% Match", duration: "1h 45m", style: { objectPosition: "center 70%" } },
            { id: "a2", title: "Memory 2", image: "/Akshat/akshat-2.jpeg", match: "99% Match", duration: "2h 10m", style: { objectPosition: "center center" } },
            { id: "a3", title: "Memory 3", image: "/Akshat/akshat-3.jpeg", match: "100% Match", duration: "1h 20m", style: { objectPosition: "center bottom" } },
            { id: "a5", title: "Memory 4", image: "/Akshat/akshat-5.jpeg", match: "95% Match", duration: "45m", style: { objectPosition: "center center" } },
            { id: "a4", title: "Memory 5", image: "/Akshat/akshat-4.jpeg", match: "95% Match", duration: "45m", style: { objectPosition: "center 70%" } },
          ]
        }
      ]
    };
  } else if (profile === "us") {
    return {
      hero: {
        title: "Life of Mantasha & Akshat",
        description: "A cinematic journey through our most beautiful moments. Press play to experience the magic of us all over again.",
        videoUrl: "/Us/video.mp4",
        videoStyle: {
          objectPosition: "40% 55%", // Pull focus bottom-left to center subjects
          transform: "scale(1.05)"
        },
      },
      rows: [
        {
          id: "row-1",
          title: "Popular on Netflix",
          items: [
            { id: "u1", title: "Our Memory 1", image: "/Us/Us-1.jpeg", match: "100% Match", duration: "1h 45m", style: { objectPosition: "center 70%" } },
            { id: "u4", title: "Our Memory 2", image: "/Us/Us-4.jpeg", match: "95% Match", duration: "45m", style: { objectPosition: "center -10%" } },
            { id: "u2", title: "Our Memory 3", image: "/Us/Us-2.jpeg", match: "99% Match", duration: "2h 10m", style: { objectPosition: "center 70%" } },
            { id: "u5", title: "Our Memory 4", image: "/Us/Us-5.jpg", match: "99% Match", duration: "1h 10m", style: { objectPosition: "center 30%" } },
            { id: "u3", title: "Our Memory 5", image: "/Us/Us-3.jpeg", match: "100% Match", duration: "1h 20m", style: { objectPosition: "center 80%" } },
          ]
        }
      ]
    };
  } else {
    // Default to Mantasha
    return {
      hero: {
        title: "Life of Mantasha & Akshat",
        description: "A cinematic journey through our most beautiful moments. Press play to experience the magic of us all over again.",
        videoUrl: "/Mantasha/mantasha-video.mp4",
        videoStyle: { 
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          width: "100vh",
          height: "100vw",
          transform: "translate(-50%, -50%) rotate(-90deg)",
          objectFit: "cover" as const
        },
      },
      rows: [
        {
          id: "row-1",
          title: "Popular on Netflix",
          items: [
            { id: "m1", title: "Memory 1", image: "/Mantasha/mantasha-1.jpeg", match: "100% Match", duration: "1h 45m", style: { objectPosition: "center 70%" } },
            { id: "m2", title: "Memory 2", image: "/Mantasha/mantasha-2.jpeg", match: "99% Match", duration: "2h 10m", style: { objectPosition: "center 40%" } },
            { id: "m3", title: "Memory 3", image: "/Mantasha/mantasha-3.jpeg", match: "100% Match", duration: "1h 20m", style: { objectPosition: "center 60%" } },
            { id: "m4", title: "Memory 4", image: "/Mantasha/mantasha-4.jpeg", match: "95% Match", duration: "45m", style: { objectPosition: "center 70%" } },
            { id: "m5", title: "Memory 5", image: "/Mantasha/mantasha-5.jpeg", match: "98% Match", duration: "1h 15m", style: { objectPosition: "center 18%" } },
          ]
        }
      ]
    };
  }
};

export const MEMORY_SECTIONS = [
  {
    id: "mem-1",
    title: "The Beginning",
    description: "It all started with a simple hello, and suddenly all the love songs were about you.",
    image: "/Mantasha/mantasha-1.jpeg",
  },
  {
    id: "mem-2",
    title: "Our Adventures",
    description: "Every place is beautiful when you are by my side(Even KGP). Here's to finding new horizons together.",
    image: "/Us/Us-2.jpeg",
  },
  {
    id: "mem-3",
    title: "Quiet Moments",
    description: "In the silence between our laughs, I found my forever home.",
    image: "/peace.jpeg",
    style: { objectPosition: "center 90%" } // Pull the person up from the bottom
  }
];
