import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { 
  Music, 
  User, 
  Download, 
  ExternalLink, 
  FileText,
  Hash,
  Search
} from 'lucide-react';
import { getTracks } from '@/lib/getTracks';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const navigate = useNavigate();
  const [tracks] = useState(getTracks());

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 'Tailwind CSS',
    'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST APIs'
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search tracks, skills, pages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => runCommand(() => navigate('/'))}>
            <User className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/recruiters'))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Recruiters</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/download'))}>
            <Download className="mr-2 h-4 w-4" />
            <span>Download</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Tracks">
          {tracks.map((track) => (
            <CommandItem
              key={track.id}
              onSelect={() => runCommand(() => navigate(`/tracks/${track.id}`))}
            >
              <Music className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>{track.title}</span>
                <span className="text-xs text-muted-foreground">{track.subtitle}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Skills">
          {skills.map((skill) => (
            <CommandItem key={skill}>
              <Hash className="mr-2 h-4 w-4" />
              <span>{skill}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Links">
          <CommandItem onSelect={() => runCommand(() => window.open('https://github.com/yourname', '_blank'))}>
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>GitHub Profile</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open('https://linkedin.com/in/yourname', '_blank'))}>
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>LinkedIn Profile</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}