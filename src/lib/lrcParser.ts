import { LyricLine } from '@/types/track';

export function parseLRC(lrcString: string): LyricLine[] {
  const lines = lrcString.split('\n');
  const lyricLines: LyricLine[] = [];

  lines.forEach(line => {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\]\s*(.+)/);
    if (match) {
      const [, minutes, seconds, centiseconds, text] = match;
      const timeSeconds = parseInt(minutes) * 60 + parseInt(seconds) + parseInt(centiseconds) / 100;
      lyricLines.push({ timeSeconds, text });
    }
  });

  return lyricLines.sort((a, b) => a.timeSeconds - b.timeSeconds);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}