import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Player } from '@/components/Player';
import { Lyrics } from '@/components/Lyrics';
import { LinerNotes } from '@/components/LinerNotes';
import { StackBadges } from '@/components/StackBadges';
import { CTAButtons } from '@/components/CTAButtons';
import { getTrack } from '@/lib/getTracks';
import { parseLRC } from '@/lib/lrcParser';
import { usePlayerStore } from '@/store/playerStore';

export default function TrackDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [track, setTrack] = useState(getTrack(id || ''));
  const { setCurrentTrack, setIsPlaying, setCurrentTime } = usePlayerStore();

  useEffect(() => {
    if (track) {
      setCurrentTrack(track.id);
    }
  }, [track, setCurrentTrack]);

  if (!track) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Track not found</p>
      </div>
    );
  }

  const handleLyricClick = (timeSeconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeSeconds;
      setCurrentTime(timeSeconds);
    }
  };

  const handleSkipIntro = () => {
    const lyrics = parseLRC(track.lrc);
    const firstVerse = lyrics.find(line => 
      line.text.toLowerCase().includes('verse') || 
      line.timeSeconds > 15
    );
    
    if (firstVerse && audioRef.current) {
      audioRef.current.currentTime = firstVerse.timeSeconds;
      setCurrentTime(firstVerse.timeSeconds);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to tracks
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleShare}
            className="text-muted-foreground hover:text-foreground"
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </motion.div>

        {/* Track Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row gap-8 mb-8"
        >
          <div className="lg:w-1/3">
            <img
              src={track.coverUrl}
              alt={track.title}
              className="w-full aspect-square object-cover rounded-lg shadow-elevated"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-cover.jpg';
              }}
            />
          </div>
          
          <div className="lg:w-2/3 space-y-6">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-2">
                {track.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {track.subtitle}
              </p>
              <StackBadges stack={track.stack} />
            </div>
            
            <CTAButtons links={track.links} />
          </div>
        </motion.div>

        {/* Player and Lyrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Player 
              track={track} 
              onSkipIntro={handleSkipIntro}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Lyrics 
              lrc={track.lrc} 
              onLyricClick={handleLyricClick}
            />
          </motion.div>
        </div>

        {/* Liner Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <LinerNotes
            problem={track.problem}
            approach={track.approach}
            impact={track.impact}
          />
        </motion.div>
      </div>
    </div>
  );
}