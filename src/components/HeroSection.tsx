import { Play, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

export function HeroSection() {
  return (
    <div className="relative h-80 overflow-hidden rounded-lg mb-8">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 flex items-end p-8">
        <div>
          <h1 className="text-5xl font-bold text-foreground mb-2">
            Your Music, Your Mood
          </h1>
          <p className="text-xl text-foreground/80 mb-6">
            Discover new favorites and rediscover classics
          </p>
          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full shadow-glow"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Play
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-foreground/20 text-foreground hover:bg-foreground/10 px-8 py-3 rounded-full"
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Shuffle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}