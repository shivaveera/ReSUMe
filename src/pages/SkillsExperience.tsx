
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CTAButtons } from '@/components/CTAButtons';

const SkillsExperience = () => {
  const skills = [
    { name: 'React/Next.js', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'Node.js/Express', level: 88, category: 'Backend' },
    { name: 'Python/Django', level: 85, category: 'Backend' },
    { name: 'PostgreSQL/MongoDB', level: 82, category: 'Database' },
    { name: 'AWS/Docker', level: 80, category: 'DevOps' },
    { name: 'GraphQL', level: 78, category: 'API' },
    { name: 'Machine Learning', level: 75, category: 'AI/ML' },
  ];

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      description: 'Led development of enterprise web applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.',
      achievements: [
        'Reduced application load time by 60% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 80%',
        'Led team of 5 developers on critical client projects'
      ],
      tech: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker']
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      period: '2020 - 2022',
      location: 'Remote',
      description: 'Built scalable web applications from scratch, worked directly with founders to define product requirements and technical architecture.',
      achievements: [
        'Developed MVP that secured $2M in Series A funding',
        'Built real-time chat system handling 10K+ concurrent users',
        'Integrated payment systems and third-party APIs'
      ],
      tech: ['Vue.js', 'Python', 'Django', 'Redis', 'Stripe API']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency Pro',
      period: '2019 - 2020',
      location: 'New York, NY',
      description: 'Created responsive web interfaces for high-profile clients, collaborated with design teams to implement pixel-perfect UIs.',
      achievements: [
        'Delivered 15+ client projects ahead of schedule',
        'Improved website performance scores by 40% on average',
        'Established component library used across all projects'
      ],
      tech: ['React', 'SASS', 'Webpack', 'Figma', 'Adobe Creative Suite']
    }
  ];

  const certifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional Developer',
    'MongoDB Certified Developer',
    'Scrum Master Certified (PSM I)'
  ];

  return (
    <div className="p-6 space-y-12">
      {/* Header */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-foreground mb-4">Skills & Experience</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A comprehensive overview of my technical expertise and professional journey 
            in full-stack development.
          </p>
        </motion.div>
      </section>

      {/* Skills */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-8">Technical Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="p-4 bg-card border-border">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-foreground">{skill.name}</span>
                      <Badge variant="secondary">{skill.category}</Badge>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    <span className="text-sm text-muted-foreground mt-1">{skill.level}%</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-8">Work Experience</h2>
          
          <div className="space-y-6">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-foreground">{job.title}</CardTitle>
                        <div className="flex items-center gap-2 text-primary font-semibold">
                          <span>{job.company}</span>
                          <ExternalLink className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex flex-col md:text-right text-sm text-muted-foreground mt-2 md:mt-0">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{job.period}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-foreground mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {job.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.tech.map((tech) => (
                          <Badge key={tech} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Certifications */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">Certifications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className="p-4 bg-card border-border hover:bg-muted/50 transition-colors">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-medium text-foreground">{cert}</span>
                    </div>
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
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Work Together?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Let's discuss how my skills and experience can help bring your project to life.
          </p>
          <CTAButtons />
        </motion.div>
      </section>
    </div>
  );
};

export default SkillsExperience;
