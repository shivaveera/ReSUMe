
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, TrendingUp, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ModernTrackCard } from '@/components/ModernTrackCard';
import { getTracks } from '@/lib/getTracks';
import { usePlayerStore } from '@/store/playerStore';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks] = useState(getTracks());
  const { setCurrentTrack, setIsPlaying } = usePlayerStore();

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingSearches = [
    'Full Stack', 'React', 'AI/ML', 'E-commerce', 'Frontend'
  ];

  const recentSearches = [
    'JavaScript Projects', 'Portfolio Sites', 'Web Development'
  ];

  const handlePlay = (trackId: string) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Search Header */}
      <section>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-foreground mb-6">Search</h1>
          
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="What do you want to explore?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg bg-input border-border focus:ring-primary"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {!searchTerm ? (
        <>
          {/* Trending Searches */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Trending</h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  onClick={() => setSearchTerm(term)}
                  className="rounded-full border-border hover:bg-muted"
                >
                  {term}
                </Button>
              ))}
            </div>
          </section>

          {/* Recent Searches */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Recent searches</h2>
            </div>
            
            <div className="space-y-2">
              {recentSearches.map((term) => (
                <Button
                  key={term}
                  variant="ghost"
                  onClick={() => setSearchTerm(term)}
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <Clock className="h-4 w-4 mr-3" />
                  {term}
                </Button>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Search Results */
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {filteredTracks.length > 0 
              ? `${filteredTracks.length} results for "${searchTerm}"`
              : `No results for "${searchTerm}"`
            }
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ModernTrackCard
                  track={track}
                  onPlay={() => handlePlay(track.id)}
                  playCount={Math.floor(Math.random() * 1000) + 100}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;
