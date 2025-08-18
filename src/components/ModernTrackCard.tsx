import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Clock, ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Track } from '@/types/track';
import { formatTime } from '@/lib/lrcParser';
import { usePlayerStore } from '@/store/playerStore';
import { Link } from 'react-router-dom';

interface ModernTrackCardProps {
  track: Track;
  onPlay: () => void;
  playCount?: number;
  index: number;
}

export function ModernTrackCard({ track, onPlay, playCount = 0, index }: ModernTrackCardProps) {
  const { currentTrackId, isPlaying } = usePlayerStore();
  const isCurrentTrack = currentTrackId === track.id;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="kibo-card overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-4 pb-3">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0 flex-1">
                <Link 
                  to={`/tracks/${track.id}`}
                  className="block hover:text-primary transition-colors"
                >
                  <h3 className="font-semibold text-foreground truncate">
                    {track.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground truncate">
                  {track.subtitle}
                </p>
              </div>
              <div className="flex gap-1">
                {track.stack.slice(0, 2).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Cover */}
          <div className="relative aspect-square overflow-hidden grain">
            <div className="absolute inset-0 duotone-green opacity-80" />
            <img 
              src={track.coverUrl} 
              alt={track.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              } group-hover:scale-105`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-cover.jpg';
              }}
            />
            
            {/* Play Button */}
            <Button
              size="sm"
              onClick={onPlay}
              className={`absolute bottom-4 right-4 rounded-full p-3 shadow-lg transition-all duration-200 ${
                isCurrentTrack && isPlaying
                  ? 'opacity-100 translate-y-0 bg-primary hover:bg-primary/90'
                  : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 bg-primary hover:bg-primary/90'
              }`}
            >
              <Play className="h-4 w-4 fill-current" />
            </Button>

            {/* Large Title Overlay */}
            <div className="absolute inset-0 flex items-end p-6">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg leading-tight">
                {track.title}
              </h2>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 pt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(track.duration)}</span>
                </div>
                
                {playCount > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full">
                    <Users className="h-3 w-3" />
                    <span className="font-mono font-medium">{playCount}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                {track.links.github && (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                  >
                    <a href={track.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3" />
                    </a>
                  </Button>
                )}
                {track.links.live && (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                  >
                    <a href={track.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Stack Tags */}
            <div className="flex flex-wrap gap-1">
              {track.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-md"
                >
                  {tech}
                </span>
              ))}
              {track.stack.length > 4 && (
                <span className="px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-md">
                  +{track.stack.length - 4}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}