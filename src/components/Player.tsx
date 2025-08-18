import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Track } from '@/types/track';
import { formatTime } from '@/lib/lrcParser';
import { usePlayerStore } from '@/store/playerStore';
import { incrementPlayCount, incrementCompleteCount } from '@/lib/supabase';

interface PlayerProps {
  track: Track;
  onSkipIntro?: () => void;
}

export function Player({ track, onSkipIntro }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
  } = usePlayerStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (!hasCompleted) {
        incrementCompleteCount(track.id);
        setHasCompleted(true);
      }
    };

    const handlePlay = () => {
      if (!hasPlayedOnce) {
        incrementPlayCount(track.id);
        setHasPlayedOnce(true);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
    };
  }, [track.id, hasPlayedOnce, hasCompleted, setCurrentTime, setDuration, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        handlePlayPause();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, currentTime - 5);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(duration, currentTime + 5);
        }
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, duration, isPlaying]);

  return (
    <Card className="bg-card border border-border p-6">
      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="metadata"
        onError={() => console.error('Audio failed to load')}
      />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            size="lg"
            onClick={handlePlayPause}
            className="bg-primary hover:bg-primary/90 rounded-full p-4 shadow-glow"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          
          {onSkipIntro && (
            <Button
              variant="outline"
              onClick={onSkipIntro}
              className="text-sm"
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip Intro
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.1}
              className="w-20"
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          onValueChange={handleSeek}
          max={duration || 100}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>Spotify-inspired. All audio original.</p>
        <p className="mt-1">
          <kbd className="px-1 py-0.5 bg-secondary rounded text-xs">Space</kbd> Play/Pause • 
          <kbd className="px-1 py-0.5 bg-secondary rounded text-xs ml-1">←/→</kbd> Seek ±5s
        </p>
      </div>
    </Card>
  );
}