
import { motion } from 'framer-motion';
import { Play, Users, Clock, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Track } from '@/types/track';
import { formatTime } from '@/lib/lrcParser';
import { usePlayerStore } from '@/store/playerStore';

interface TrackCardProps {
  track: Track;
  onPlay: () => void;
  playCount?: number;
}

export function TrackCard({ track, onPlay, playCount = 0 }: TrackCardProps) {
  const { currentTrackId, isPlaying } = usePlayerStore();
  const isCurrentTrack = currentTrackId === track.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group bg-gradient-card hover:bg-card/80 transition-all duration-300 cursor-pointer border-0 shadow-card hover:shadow-elevated">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <div className="relative w-full aspect-square rounded-md overflow-hidden bg-muted/50 flex items-center justify-center">
              {track.coverUrl ? (
                <img 
                  src={track.coverUrl} 
                  alt={track.title}
                  className="w-full h-full object-cover mood-cover"
                />
              ) : (
                <Music className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            <Button
              size="sm"
              onClick={onPlay}
              className={`absolute bottom-2 right-2 rounded-full p-3 shadow-glow transition-all duration-300 transform ${
                isCurrentTrack && isPlaying
                  ? 'opacity-100 translate-y-0 bg-primary hover:bg-primary/90'
                  : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 bg-primary hover:bg-primary/90'
              }`}
            >
              <Play className="h-4 w-4 fill-current" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground truncate">
              {track.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {track.subtitle}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{formatTime(track.duration)}</span>
              </div>
              
              {playCount > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{playCount}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {track.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-md"
                >
                  {tech}
                </span>
              ))}
              {track.stack.length > 3 && (
                <span className="px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-md">
                  +{track.stack.length - 3}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
