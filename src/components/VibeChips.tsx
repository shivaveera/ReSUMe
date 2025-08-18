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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => onVibeToggle(vibe as VibeType)}
            className={`kibo-chip ${
              isSelected
                ? 'active'
                : ''
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