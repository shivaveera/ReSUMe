import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AlbumCardProps {
  title: string;
  artist: string;
  image: string;
  type?: "album" | "playlist" | "artist";
}

export function AlbumCard({ title, artist, image, type = "album" }: AlbumCardProps) {
  return (
    <Card className="group bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer border-0 bg-gradient-card shadow-card hover:shadow-elevated">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img 
            src={image} 
            alt={title}
            className="w-full aspect-square object-cover rounded-md shadow-lg"
          />
          <Button
            size="sm"
            className="absolute bottom-2 right-2 bg-primary hover:bg-primary/90 rounded-full p-3 shadow-glow opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            <Play className="h-4 w-4 fill-current" />
          </Button>
        </div>
        <div>
          <h3 className="font-semibold text-foreground truncate mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {type === "playlist" ? "Playlist" : `By ${artist}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}