
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModernTrackCard } from '@/components/ModernTrackCard';
import { VibeChips } from '@/components/VibeChips';
import { getTracks } from '@/lib/getTracks';
import { usePlayerStore } from '@/store/playerStore';
import { VibeType } from '@/types/track';

const Index = () => {
  const [tracks] = useState(getTracks());
  const [selectedVibes, setSelectedVibes] = useState<VibeType[]>([]);
  const [filteredTracks, setFilteredTracks] = useState(tracks);
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();

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

  const handlePlayAll = () => {
    if (filteredTracks.length > 0) {
      setCurrentTrack(filteredTracks[0].id);
      setIsPlaying(true);
    }
  };

  const handleShuffle = () => {
    if (filteredTracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredTracks.length);
      setCurrentTrack(filteredTracks[randomIndex].id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-lg p-8 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-bold text-foreground mb-4">
              Good evening
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Discover Shiva Veera's portfolio through code and sound
            </p>
            
            <div className="flex gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
                onClick={handlePlayAll}
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                Play all
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full px-8"
                onClick={handleShuffle}
              >
                Shuffle
              </Button>
            </div>

            {/* Vibe Chips */}
            <VibeChips 
              selectedVibes={selectedVibes} 
              onVibeToggle={handleVibeToggle} 
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Play Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Recently played
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.slice(0, 6).map((track) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card hover:bg-muted/50 rounded-lg p-4 flex items-center gap-4 group cursor-pointer transition-colors"
              onClick={() => handlePlay(track.id)}
            >
              <img
                src={track.coverUrl}
                alt={track.title}
                className="w-16 h-16 rounded-md object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-cover.jpg';
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {track.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {track.subtitle}
                </p>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play className="h-4 w-4 fill-current" />
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Made for You */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Made for you
          </h2>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Show all
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredTracks.map((track, index) => (
            <ModernTrackCard
              key={track.id}
              track={track}
              onPlay={() => handlePlay(track.id)}
              playCount={Math.floor(Math.random() * 1000) + 100}
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
              No projects match the selected vibes. Try different filters.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Index;
