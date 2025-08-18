import { Track } from '@/types/track';
import tracksData from '@/data/tracks.json';

export function getTracks(): Track[] {
  return tracksData as Track[];
}

export function getTrack(id: string): Track | null {
  const tracks = getTracks();
  return tracks.find(track => track.id === id) || null;
}

export function getTracksByVibe(vibe: string): Track[] {
  const tracks = getTracks();
  return tracks.filter(track => track.vibe.includes(vibe as any));
}