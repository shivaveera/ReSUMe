import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download as DownloadIcon, ExternalLink, Github, QrCode, FileText, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { getTracks } from '@/lib/getTracks';

export default function Download() {
  const [copied, setCopied] = useState(false);
  const tracks = getTracks();
  
  const handleDownloadResume = () => {
    // This would trigger a PDF download in a real implementation
    window.open('/resume.pdf', '_blank');
  };

  const handleDownloadJSON = () => {
    // This would trigger a JSON download in a real implementation
    const resumeData = {
      name: "Shiva Veera",
      title: "Full-Stack Developer",
      location: "Dallas, TX",
      email: "hello@shivaveera.com",
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
      projects: tracks.map(track => ({
        title: track.title,
        description: track.subtitle,
        stack: track.stack,
        links: track.links
      }))
    };
    
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shiva-veera-resume.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResumeUrl = async () => {
    const url = `${window.location.origin}/resume.pdf`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projectLinks = tracks.filter(track => track.links.live || track.links.github);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Download & Links
          </h1>
          <p className="text-xl text-muted-foreground">
            Get my resume and explore project links
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resume Downloads */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="kibo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resume Downloads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleDownloadResume}
                  className="w-full justify-start gap-3 h-12"
                  size="lg"
                >
                  <DownloadIcon className="h-5 w-5" />
                  Download Resume (PDF)
                </Button>
                
                <Button
                  onClick={handleDownloadJSON}
                  variant="outline"
                  className="w-full justify-start gap-3 h-12"
                  size="lg"
                >
                  <DownloadIcon className="h-5 w-5" />
                  Download Resume (JSON)
                </Button>

                <div className="pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Share Resume URL</span>
                    <Button
                      onClick={copyResumeUrl}
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {/* QR Code Placeholder */}
                  <div className="flex items-center justify-center p-6 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <QrCode className="h-16 w-16 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        QR Code for Resume URL
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="kibo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Project Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projectLinks.map((track) => (
                    <div
                      key={track.id}
                      className="kibo-list-item border border-border/60 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">
                          {track.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {track.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {track.stack.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {track.links.github && (
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="p-2"
                          >
                            <a
                              href={track.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View GitHub repository"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {track.links.live && (
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="p-2"
                          >
                            <a
                              href={track.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View live demo"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="kibo-card">
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-semibold mb-4">Let's Connect</h2>
              <p className="text-muted-foreground mb-6">
                Ready to discuss opportunities or have questions about my work?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <a href="mailto:hello@shivaveera.com">
                    Email Me
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://linkedin.com/in/shivaveera" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://github.com/shivaveera" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}