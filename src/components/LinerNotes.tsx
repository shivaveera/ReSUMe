import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

interface LinerNotesProps {
  problem: string;
  approach: string;
  impact: string;
}

export function LinerNotes({ problem, approach, impact }: LinerNotesProps) {
  const sections = [
    {
      title: 'The Problem',
      content: problem,
      icon: Target,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    },
    {
      title: 'The Approach',
      content: approach,
      icon: Lightbulb,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      title: 'The Impact',
      content: impact,
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="text-xl text-foreground">Liner Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${section.bgColor}`}>
                  <Icon className={`h-5 w-5 ${section.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {section.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed ml-12">
                {section.content}
              </p>
              
              {index < sections.length - 1 && (
                <div className="border-b border-border mt-6" />
              )}
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}