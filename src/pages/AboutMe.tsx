
import { motion } from 'framer-motion';
import { Code, Coffee, Music, MapPin, Calendar, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CTAButtons } from '@/components/CTAButtons';

const AboutMe = () => {
  const stats = [
    { label: 'Projects Completed', value: '50+' },
    { label: 'Years of Experience', value: '5+' },
    { label: 'Technologies Mastered', value: '20+' },
    { label: 'Coffee Cups', value: '∞' },
  ];

  const interests = [
    { icon: Code, label: 'Full Stack Development', desc: 'Building end-to-end applications' },
    { icon: Music, label: 'Music Production', desc: 'Creating beats and melodies' },
    { icon: Coffee, label: 'Coffee Brewing', desc: 'Perfect pour-over techniques' },
    { icon: Heart, label: 'Open Source', desc: 'Contributing to the community' },
  ];

  return (
    <div className="p-6 space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-primary-foreground">
            BV
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Hi, I'm Bhavani Veera
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A passionate full-stack developer who turns coffee into code and ideas into reality. 
            I create digital experiences that matter, one commit at a time.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center bg-card border-border">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* About */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">My Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Started my journey in tech with a simple "Hello World" and never looked back. 
                What began as curiosity evolved into a passion for creating meaningful digital experiences.
              </p>
              <p>
                I believe in clean code, pixel-perfect designs, and the magic that happens when 
                technology meets creativity. Every project is an opportunity to learn something new 
                and push the boundaries of what's possible.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new music genres, experimenting with 
                coffee brewing methods, or contributing to open source projects that make the web 
                a better place for everyone.
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Available for new opportunities</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="p-4 bg-card border-border hover:bg-muted/50 transition-colors">
                  <CardContent className="p-0 text-center">
                    <interest.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{interest.label}</h3>
                    <p className="text-xs text-muted-foreground">{interest.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Let's Create Something Amazing</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Ready to bring your ideas to life? Let's collaborate and build something extraordinary together.
          </p>
          <CTAButtons />
        </motion.div>
      </section>
    </div>
  );
};

export default AboutMe;
