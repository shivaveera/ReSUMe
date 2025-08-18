import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { ModernTrackCard } from '@/components/ModernTrackCard';
import { VibeChips } from '@/components/VibeChips';
import { MiniPlayer } from '@/components/MiniPlayer';
import { getTracks } from '@/lib/getTracks';
import { usePlayerStore } from '@/store/playerStore';
import { VibeType } from '@/types/track';

const Index = () => {
  const [tracks] = useState(getTracks());
  const [selectedVibes, setSelectedVibes] = useState<VibeType[]>([]);
  const [filteredTracks, setFilteredTracks] = useState(tracks);
  const { currentTrackId, setCurrentTrack, setIsPlaying } = usePlayerStore();

  useEffect(() => {
    if (selectedVibes.length === 0) {
      setFilteredTracks(tracks);
    } else {
      setFilteredTracks(
        tracks.filter(track => 
          selectedVibes.some(vibe => track.vibe.includes(vibe))
        )
      );
    }
  }, [selectedVibes, tracks]);

  const handleVibeToggle = (vibe: VibeType) => {
    setSelectedVibes(prev => 
      prev.includes(vibe) 
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };

  const handlePlay = (trackId: string) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  const currentTrack = tracks.find(t => t.id === currentTrackId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <AnnouncementBanner />
        
        {/* Hero Section */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                No luck. Only hard work.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Full-stack developer crafting digital experiences through code, 
                one commit at a time. Based in Dallas, building for the world.
              </p>
              
              {/* Vibe Chips */}
              <VibeChips 
                selectedVibes={selectedVibes} 
                onVibeToggle={handleVibeToggle} 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden grain duotone-green">
                <img 
                  src="/covers/origin-story.jpg" 
                  alt="Shiva Veera"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-cover.jpg';
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tracks Grid */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Featured Projects
            </h2>
            <p className="text-muted-foreground">
              {selectedVibes.length > 0 
                ? `Filtered by ${selectedVibes.length} vibe${selectedVibes.length > 1 ? 's' : ''}`
                : `${tracks.length} projects showcasing full-stack development`
              }
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track, index) => (
              <ModernTrackCard
                key={track.id}
                track={track}
                onPlay={() => handlePlay(track.id)}
                playCount={Math.floor(Math.random() * 1000) + 100} // Mock data
                index={index}
              />
            ))}
          </div>
          
          {filteredTracks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No tracks match the selected vibes. Try different filters.
              </p>
            </motion.div>
          )}
        </section>
      </main>

      {/* Mini Player */}
      {currentTrack && (
        <MiniPlayer
          track={currentTrack}
          onPlay={() => setIsPlaying(!usePlayerStore.getState().isPlaying)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-border/60 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Spotify-inspired. All audio is original.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Shiva Veera. Built with React & TypeScript.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;