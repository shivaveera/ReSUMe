import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Track } from '@/types/track';
import { formatTime } from '@/lib/lrcParser';
import { usePlayerStore } from '@/store/playerStore';

interface MiniPlayerProps {
  track: Track | null;
  onPlay: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function MiniPlayer({ track, onPlay, onNext, onPrevious }: MiniPlayerProps) {
  const { isPlaying, currentTime, duration } = usePlayerStore();

  if (!track) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <Card className="bg-card/95 backdrop-blur-md border border-border shadow-elevated">
          <div className="flex items-center gap-4 p-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img 
                src={track.coverUrl} 
                alt={track.title}
                className="w-12 h-12 rounded-md object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-cover.jpg';
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {track.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {track.subtitle}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {onPrevious && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onPrevious}
                  className="p-2"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="default"
                size="sm"
                onClick={onPlay}
                className="bg-primary hover:bg-primary/90 rounded-full p-2"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              {onNext && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onNext}
                  className="p-2"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Progress */}
            <div className="hidden md:flex items-center gap-2 min-w-0 flex-1">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                className="flex-1"
                disabled
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(duration)}
              </span>
            </div>
          </div>
          
          {/* Mobile progress bar */}
          <div className="md:hidden px-4 pb-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              className="w-full"
              disabled
            />
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}