
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useMoodContext, MoodType } from '@/contexts/MoodContext';

const moodOptions: Array<{ id: MoodType; emoji: string; label: string }> = [
  { id: 'eminem-energy', emoji: '🔥', label: 'Eminem Energy' },
  { id: 'nicki-style', emoji: '👑', label: 'Nicki Style' },
  { id: 'doja-style', emoji: '✨', label: 'Doja Style' },
  { id: 'weeknd-synth', emoji: '🌙', label: 'Weeknd Synth' }
];

export function MoodSelector() {
  const { showMoodSelector, setSelectedMood } = useMoodContext();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  return (
    <AnimatePresence>
      {showMoodSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-card border border-border/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Choose Your Vibe
              </h2>
              <p className="text-muted-foreground mb-8">
                Select a mood to personalize your experience
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {moodOptions.map((mood, index) => (
                <motion.div
                  key={mood.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Button
                    onClick={() => handleMoodSelect(mood.id)}
                    className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-secondary/50 hover:bg-secondary border border-border/40 hover:border-primary/50 transition-all duration-300 group"
                    variant="outline"
                  >
                    <motion.span
                      className="text-2xl group-hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {mood.emoji}
                    </motion.span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {mood.label}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-muted-foreground mt-6"
            >
              You can change this anytime in settings
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
