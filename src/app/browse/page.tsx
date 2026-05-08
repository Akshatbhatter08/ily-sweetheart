import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ContentRow from "@/components/ContentRow";
import MemorySection from "@/components/MemorySection";
import RollingCredits from "@/components/RollingCredits";
import { getProfileData } from "@/lib/data";

export default async function BrowsePage(props: { searchParams: Promise<{ profile?: string }> }) {
  const searchParams = await props.searchParams;
  const profileName = searchParams.profile || "mantasha";
  const data = getProfileData(profileName);

  return (
    <div className="min-h-screen bg-netflix-black text-white relative">
      <Navbar currentProfile={profileName} />
      
      <main className="pb-24">
        <HeroBanner 
          title={data.hero.title}
          description={data.hero.description}
          videoUrl={data.hero.videoUrl}
          videoStyle={data.hero.videoStyle}
        />
        
        {/* Content Rows Section */}
        <div className="relative z-20 -mt-24 md:-mt-32 pb-12">
          {data.rows.map((row) => (
            <ContentRow key={row.id} title={row.title} items={row.items} />
          ))}
        </div>

        {/* Personalized Memories Story Scroll */}
        <div id="our-story" className="relative z-10 bg-black pt-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-light text-gray-400 tracking-widest uppercase">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-netflix-red mx-auto mt-4 rounded-full" />
          </div>
          <MemorySection />
        </div>

        {/* Cinematic Ending */}
        <RollingCredits />
      </main>
    </div>
  );
}
