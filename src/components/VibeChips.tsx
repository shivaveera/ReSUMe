import { motion } from 'framer-motion';
import { VibeType } from '@/types/track';

interface VibeChipsProps {
  selectedVibes: VibeType[];
  onVibeToggle: (vibe: VibeType) => void;
}

const vibeConfig = {
  'eminem-energy': { label: 'Eminem Energy', emoji: '🔥' },
  'nicki-style': { label: 'Nicki Style', emoji: '👑' },
  'doja-style': { label: 'Doja Style', emoji: '✨' },
  'weeknd-synth': { label: 'Weeknd Synth', emoji: '🌙' },
};

export function VibeChips({ selectedVibes, onVibeToggle }: VibeChipsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {Object.entries(vibeConfig).map(([vibe, config]) => {
        const isSelected = selectedVibes.includes(vibe as VibeType);
        
        return (
          <motion.button
            key={vibe}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onVibeToggle(vibe as VibeType)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isSelected
                ? 'bg-primary text-primary-foreground shadow-glow'
                : 'bg-secondary/50 text-foreground hover:bg-secondary/80 border border-border'
            }`}
          >
            <span className="mr-2">{config.emoji}</span>
            {config.label}
          </motion.button>
        );
      })}
    </div>
  );
}