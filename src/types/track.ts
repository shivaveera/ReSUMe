export interface Track {
  id: string;
  title: string;
  subtitle: string;
  duration: number; // in seconds
  audioUrl: string;
  coverUrl: string;
  vibe: Array<'eminem-energy' | 'nicki-style' | 'doja-style' | 'weeknd-synth'>;
  lrc: string; // LRC format lyrics
  stack: string[];
  links: {
    github?: string;
    live?: string;
  };
  metrics: {
    users?: string;
    uptime?: string;
  };
  problem: string;
  approach: string;
  impact: string;
}

export interface LyricLine {
  timeSeconds: number;
  text: string;
}

export type VibeType = 'eminem-energy' | 'nicki-style' | 'doja-style' | 'weeknd-synth';