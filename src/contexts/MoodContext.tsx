
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type MoodType = 'eminem-energy' | 'nicki-style' | 'doja-style' | 'weeknd-synth';

interface MoodConfig {
  label: string;
  emoji: string;
  theme: {
    primary: string;
    gradient: string;
    coverFilter: string;
  };
}

const moodConfigs: Record<MoodType, MoodConfig> = {
  'eminem-energy': {
    label: 'Eminem Energy',
    emoji: '🔥',
    theme: {
      primary: '0 84% 60%', // Red
      gradient: 'linear-gradient(135deg, hsl(0 84% 60% / 0.8) 0%, hsl(15 84% 60% / 0.8) 100%)',
      coverFilter: 'sepia(1) hue-rotate(330deg) saturate(1.2)'
    }
  },
  'nicki-style': {
    label: 'Nicki Style',
    emoji: '👑',
    theme: {
      primary: '320 76% 60%', // Pink/Purple
      gradient: 'linear-gradient(135deg, hsl(320 76% 60% / 0.8) 0%, hsl(340 76% 60% / 0.8) 100%)',
      coverFilter: 'sepia(1) hue-rotate(290deg) saturate(1.3)'
    }
  },
  'doja-style': {
    label: 'Doja Style',
    emoji: '✨',
    theme: {
      primary: '280 83% 58%', // Purple
      gradient: 'linear-gradient(135deg, hsl(280 83% 58% / 0.8) 0%, hsl(300 83% 58% / 0.8) 100%)',
      coverFilter: 'sepia(1) hue-rotate(270deg) saturate(1.1)'
    }
  },
  'weeknd-synth': {
    label: 'Weeknd Synth',
    emoji: '🌙',
    theme: {
      primary: '200 76% 50%', // Blue
      gradient: 'linear-gradient(135deg, hsl(200 76% 50% / 0.8) 0%, hsl(220 76% 50% / 0.8) 100%)',
      coverFilter: 'sepia(1) hue-rotate(180deg) saturate(1.2)'
    }
  }
};

interface MoodContextType {
  selectedMood: MoodType | null;
  setSelectedMood: (mood: MoodType) => void;
  showMoodSelector: boolean;
  setShowMoodSelector: (show: boolean) => void;
  getMoodConfig: (mood: MoodType) => MoodConfig;
  currentTheme: MoodConfig['theme'] | null;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMoodContext = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMoodContext must be used within a MoodProvider');
  }
  return context;
};

interface MoodProviderProps {
  children: ReactNode;
}

export const MoodProvider: React.FC<MoodProviderProps> = ({ children }) => {
  const [selectedMood, setSelectedMoodState] = useState<MoodType | null>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  useEffect(() => {
    // Check if user has already selected a mood
    const savedMood = localStorage.getItem('selected-mood') as MoodType | null;
    if (savedMood && moodConfigs[savedMood]) {
      setSelectedMoodState(savedMood);
      applyTheme(savedMood);
    } else {
      // Show mood selector on first visit
      setShowMoodSelector(true);
    }
  }, []);

  const applyTheme = (mood: MoodType) => {
    const config = moodConfigs[mood];
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty('--primary', config.theme.primary);
    root.style.setProperty('--mood-gradient', config.theme.gradient);
    root.style.setProperty('--cover-filter', config.theme.coverFilter);
    
    // Update ring color to match primary
    root.style.setProperty('--ring', config.theme.primary);
  };

  const setSelectedMood = (mood: MoodType) => {
    setSelectedMoodState(mood);
    setShowMoodSelector(false);
    localStorage.setItem('selected-mood', mood);
    applyTheme(mood);
  };

  const getMoodConfig = (mood: MoodType) => moodConfigs[mood];

  const currentTheme = selectedMood ? moodConfigs[selectedMood].theme : null;

  return (
    <MoodContext.Provider
      value={{
        selectedMood,
        setSelectedMood,
        showMoodSelector,
        setShowMoodSelector,
        getMoodConfig,
        currentTheme
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
