import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Palette, 
  Sun, 
  Moon, 
  User,
  Download,
  FileText,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CommandMenu } from '@/components/CommandMenu';
import { useTheme } from 'next-themes';

export function Header() {
  const [commandOpen, setCommandOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [accentColor, setAccentColor] = useState<'green' | 'purple'>('green');

  const toggleAccent = () => {
    const newAccent = accentColor === 'green' ? 'purple' : 'green';
    setAccentColor(newAccent);
    
    if (newAccent === 'purple') {
      document.documentElement.classList.add('accent-purple');
    } else {
      document.documentElement.classList.remove('accent-purple');
    }
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/tracks', label: 'Tracks', icon: FileText },
    { href: '/recruiters', label: 'Recruiters', icon: User },
    { href: '/download', label: 'Download', icon: Download },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-semibold text-sm">
                SV
              </div>
              <span className="font-semibold text-foreground">Shiva Veera</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href === '/tracks' && location.pathname.startsWith('/tracks/'));
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Command Menu Trigger */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCommandOpen(true)}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={toggleAccent}>
                    <Palette className="mr-2 h-4 w-4" />
                    <span>Accent: {accentColor === 'green' ? 'Green' : 'Purple'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {theme === 'dark' ? (
                      <Sun className="mr-2 h-4 w-4" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4" />
                    )}
                    <span>Theme: {theme === 'dark' ? 'Light' : 'Dark'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/download">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download Resume</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}