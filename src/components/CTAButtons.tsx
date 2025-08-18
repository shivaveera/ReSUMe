import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAButtonsProps {
  links?: {
    github?: string;
    live?: string;
  };
  showResumeActions?: boolean;
}

export function CTAButtons({ links, showResumeActions = true }: CTAButtonsProps) {
  const handleDownloadResume = () => {
    // This would trigger a PDF download in a real implementation
    window.open('/resume.pdf', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:hello@yourname.com?subject=Let\'s work together!';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {showResumeActions && (
        <div className="flex flex-wrap gap-3">
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleDownloadResume}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleEmail}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Me
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button
              onClick={() => window.open('https://linkedin.com/in/yourname', '_blank')}
              variant="outline"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Button
              onClick={() => window.open('https://github.com/yourname', '_blank')}
              variant="outline"
              className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </motion.div>
        </div>
      )}
      
      {links && (
        <div className="flex gap-3 pt-2 border-t border-border">
          {links.github && (
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => window.open(links.github, '_blank')}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-4 w-4 mr-2" />
                View Code
              </Button>
            </motion.div>
          )}
          
          {links.live && (
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => window.open(links.live, '_blank')}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}