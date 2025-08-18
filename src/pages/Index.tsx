import { SidebarProvider } from "@/components/ui/sidebar";
import { SpotifySidebar } from "@/components/SpotifySidebar";
import { TopBar } from "@/components/TopBar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { HeroSection } from "@/components/HeroSection";
import { AlbumCard } from "@/components/AlbumCard";
import albumCover1 from "@/assets/album-cover-1.jpg";
import albumCover2 from "@/assets/album-cover-2.jpg";
import albumCover3 from "@/assets/album-cover-3.jpg";
import albumCover4 from "@/assets/album-cover-4.jpg";

const recentlyPlayed = [
  { title: "Electronic Dreams", artist: "Synthwave Artist", image: albumCover1 },
  { title: "Neon Nights", artist: "Retro Future", image: albumCover2 },
  { title: "Ocean Waves", artist: "Ambient Collective", image: albumCover3 },
  { title: "Cosmic Journey", artist: "Space Sounds", image: albumCover4 },
];

const madeForYou = [
  { title: "Discover Weekly", artist: "Made for you", image: albumCover2, type: "playlist" as const },
  { title: "Daily Mix 1", artist: "Made for you", image: albumCover1, type: "playlist" as const },
  { title: "Release Radar", artist: "Made for you", image: albumCover3, type: "playlist" as const },
  { title: "Your Top Songs 2024", artist: "Made for you", image: albumCover4, type: "playlist" as const },
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <SpotifySidebar />
        
        <div className="flex-1 flex flex-col">
          <TopBar />
          
          <main className="flex-1 p-6 pb-24 overflow-auto">
            <HeroSection />
            
            {/* Recently Played */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Recently played</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {recentlyPlayed.map((album, index) => (
                  <AlbumCard key={index} {...album} />
                ))}
              </div>
            </section>

            {/* Made for You */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Made for you</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {madeForYou.map((playlist, index) => (
                  <AlbumCard key={index} {...playlist} />
                ))}
              </div>
            </section>

            {/* Popular Albums */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Popular albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {[...recentlyPlayed, ...recentlyPlayed].map((album, index) => (
                  <AlbumCard key={index} {...album} />
                ))}
              </div>
            </section>
          </main>
        </div>
        
        <MusicPlayer />
      </div>
    </SidebarProvider>
  );
};

export default Index;
