import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { LyricLine } from '@/types/track';
import { parseLRC } from '@/lib/lrcParser';
import { usePlayerStore } from '@/store/playerStore';

interface LyricsProps {
  lrc: string;
  onLyricClick?: (timeSeconds: number) => void;
}

export function Lyrics({ lrc, onLyricClick }: LyricsProps) {
  const { currentTime } = usePlayerStore();
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const parsedLyrics = parseLRC(lrc);
    setLyrics(parsedLyrics);
    lineRefs.current = new Array(parsedLyrics.length).fill(null);
  }, [lrc]);

  useEffect(() => {
    const currentIndex = lyrics.findIndex((lyric, index) => {
      const nextLyric = lyrics[index + 1];
      return currentTime >= lyric.timeSeconds && 
             (!nextLyric || currentTime < nextLyric.timeSeconds);
    });

    if (currentIndex !== -1 && currentIndex !== currentLineIndex) {
      setCurrentLineIndex(currentIndex);
      
      // Auto-scroll to current line
      const currentLineElement = lineRefs.current[currentIndex];
      if (currentLineElement && containerRef.current) {
        const container = containerRef.current;
        const lineRect = currentLineElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const scrollTop = currentLineElement.offsetTop - 
                         container.offsetTop - 
                         containerRect.height / 2 + 
                         lineRect.height / 2;
        
        container.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  }, [currentTime, lyrics, currentLineIndex]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (e.code) {
      case 'KeyJ':
        e.preventDefault();
        if (currentLineIndex > 0 && onLyricClick) {
          const prevLine = lyrics[currentLineIndex - 1];
          onLyricClick(prevLine.timeSeconds);
        }
        break;
      case 'KeyK':
        e.preventDefault();
        if (currentLineIndex < lyrics.length - 1 && onLyricClick) {
          const nextLine = lyrics[currentLineIndex + 1];
          onLyricClick(nextLine.timeSeconds);
        }
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentLineIndex, lyrics, onLyricClick]);

  return (
    <Card className="bg-card border border-border p-6 h-96 overflow-hidden">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Lyrics</h3>
      
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      >
        <AnimatePresence>
          {lyrics.map((lyric, index) => {
            const isActive = index === currentLineIndex;
            const isPast = index < currentLineIndex;
            
            return (
              <motion.div
                key={index}
                ref={(el) => (lineRefs.current[index] = el)}
                initial={{ opacity: 0.4 }}
                animate={{ 
                  opacity: isActive ? 1 : isPast ? 0.6 : 0.4,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                onClick={() => onLyricClick?.(lyric.timeSeconds)}
                className={`py-2 px-3 rounded-md cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/20 text-primary font-medium' 
                    : 'hover:bg-secondary/50 text-foreground'
                }`}
              >
                {lyric.text}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>
          Click any line to jump • 
          <kbd className="px-1 py-0.5 bg-secondary rounded text-xs ml-1">J/K</kbd> Previous/Next line
        </p>
      </div>
      
      {/* Screen reader accessible transcript */}
      <div className="sr-only" aria-label="Lyrics transcript">
        {lyrics.map((lyric, index) => (
          <p key={index}>{lyric.text}</p>
        ))}
      </div>
    </Card>
  );
}