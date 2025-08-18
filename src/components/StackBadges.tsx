import { motion } from 'framer-motion';

interface StackBadgesProps {
  stack: string[];
  limit?: number;
}

export function StackBadges({ stack, limit }: StackBadgesProps) {
  const displayStack = limit ? stack.slice(0, limit) : stack;
  const remainingCount = limit && stack.length > limit ? stack.length - limit : 0;

  return (
    <div className="flex flex-wrap gap-2">
      {displayStack.map((tech, index) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border border-border hover:bg-secondary/80 transition-colors"
        >
          {tech}
        </motion.span>
      ))}
      {remainingCount > 0 && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: displayStack.length * 0.1 }}
          className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full border border-primary/30"
        >
          +{remainingCount} more
        </motion.span>
      )}
    </div>
  );
}