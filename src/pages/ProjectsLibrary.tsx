
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModernTrackCard } from '@/components/ModernTrackCard';
import { getTracks } from '@/lib/getTracks';
import { usePlayerStore } from '@/store/playerStore';
import { VibeType } from '@/types/track';

const ProjectsLibrary = () => {
  const [tracks] = useState(getTracks());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();

  const categories = [
    { id: 'all', name: 'All Projects', count: tracks.length },
    { id: 'full-stack', name: 'Full Stack', count: tracks.filter(t => t.vibe.includes('eminem-energy' as VibeType)).length },
    { id: 'frontend', name: 'Frontend', count: tracks.filter(t => t.vibe.includes('nicki-style' as VibeType)).length },
    { id: 'backend', name: 'Backend APIs', count: tracks.filter(t => t.vibe.includes('weeknd-synth' as VibeType)).length },
    { id: 'ai-ml', name: 'AI/ML', count: tracks.filter(t => t.vibe.includes('doja-style' as VibeType)).length },
  ];

  const filteredTracks = selectedCategory === 'all' 
    ? tracks 
    : tracks.filter(track => {
        switch (selectedCategory) {
          case 'full-stack': return track.vibe.includes('eminem-energy' as VibeType);
          case 'frontend': return track.vibe.includes('nicki-style' as VibeType);
          case 'backend': return track.vibe.includes('weeknd-synth' as VibeType);
          case 'ai-ml': return track.vibe.includes('doja-style' as VibeType);
          default: return true;
        }
      });

  const handlePlay = (trackId: string) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-4xl font-bold text-foreground mb-2">Projects Library</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Browse through my collection of projects and code experiments
        </p>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-border"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-border"
            >
              <SortAsc className="h-4 w-4 mr-2" />
              Sort by: Recent
            </Button>
          </div>

          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          : "space-y-4"
        }>
          {filteredTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {viewMode === 'grid' ? (
                <ModernTrackCard
                  track={track}
                  onPlay={() => handlePlay(track.id)}
                  playCount={Math.floor(Math.random() * 1000) + 100}
                  index={index}
                />
              ) : (
                <div className="bg-card hover:bg-muted/50 rounded-lg p-4 flex items-center gap-4 group cursor-pointer transition-colors">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{track.title}</h3>
                    <p className="text-sm text-muted-foreground">{track.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">{track.problem}</p>
                  </div>
                  <Button
                    onClick={() => handlePlay(track.id)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Play
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsLibrary;
