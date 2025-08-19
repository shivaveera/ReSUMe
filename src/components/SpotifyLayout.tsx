
import { SpotifySidebar } from "@/components/SpotifySidebar";
import { TopBar } from "@/components/TopBar";
import { MiniPlayer } from "@/components/MiniPlayer";
import { usePlayerStore } from "@/store/playerStore";
import { getTracks } from "@/lib/getTracks";

interface SpotifyLayoutProps {
  children: React.ReactNode;
}

export function SpotifyLayout({ children }: SpotifyLayoutProps) {
  const { currentTrackId } = usePlayerStore();
  const tracks = getTracks();
  const currentTrack = tracks.find(t => t.id === currentTrackId);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <div className="flex flex-1 overflow-hidden">
        <SpotifySidebar />
        
        <div className="flex-1 flex flex-col">
          <TopBar />
          
          <main className="flex-1 overflow-auto bg-gradient-to-b from-background to-muted/20">
            {children}
          </main>
        </div>
      </div>
      
      {/* Mini Player */}
      {currentTrack && (
        <MiniPlayer
          track={currentTrack}
          onPlay={() => usePlayerStore.getState().setIsPlaying(!usePlayerStore.getState().isPlaying)}
        />
      )}
    </div>
  );
}
