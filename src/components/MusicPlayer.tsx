import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Heart, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import albumCover1 from "@/assets/album-cover-1.jpg";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([30]);
  const [volume, setVolume] = useState([70]);

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 z-50">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center gap-3 w-1/4">
          <img 
            src={albumCover1} 
            alt="Current track" 
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              Electronic Dreams
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Artist Name
            </p>
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 w-1/2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="p-2">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              variant="default"
              size="sm"
              className="p-3 bg-primary hover:bg-primary/90 rounded-full"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-muted-foreground">1:23</span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">3:45</span>
          </div>
        </div>

        {/* Volume & Options */}
        <div className="flex items-center gap-2 w-1/4 justify-end">
          <Button variant="ghost" size="sm" className="p-2">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}