
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SpotifyLayout } from "@/components/SpotifyLayout";
import { MoodProvider } from "@/contexts/MoodContext";
import { MoodSelector } from "@/components/MoodSelector";
import Index from "./pages/Index";
import Search from "./pages/Search";
import ProjectsLibrary from "./pages/ProjectsLibrary";
import AboutMe from "./pages/AboutMe";
import SkillsExperience from "./pages/SkillsExperience";
import Download from "./pages/Download";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MoodProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <SpotifyLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<ProjectsLibrary />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/skills" element={<SkillsExperience />} />
                <Route path="/download" element={<Download />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SpotifyLayout>
          </SidebarProvider>
        </BrowserRouter>
        <MoodSelector />
      </MoodProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
