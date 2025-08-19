
import { Home, Search, Library, User, Download, Briefcase } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMoodContext } from "@/contexts/MoodContext";

const mainMenuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Search", url: "/search", icon: Search },
  { title: "Projects Library", url: "/library", icon: Library },
];

const profileItems = [
  { title: "About Me", icon: User },
  { title: "Skills & Experience", icon: Briefcase },
  { title: "Download Resume", icon: Download },
];

const projectCategories = [
  { title: "Full Stack Projects", filter: "full-stack", count: 2 },
  { title: "Frontend Showcase", filter: "frontend", count: 1 },
  { title: "Backend APIs", filter: "backend", count: 1 },
  { title: "AI/ML Projects", filter: "ai-ml", count: 1 },
  { title: "E-commerce", filter: "ecommerce", count: 1 },
  { title: "Learning Journey", filter: "learning", count: 3 },
];

export function SpotifySidebar() {
  const { open } = useSidebar();
  const { setShowMoodSelector } = useMoodContext();
  const collapsed = !open;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        {!collapsed && (
          <div className="p-6 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                BV
              </div>
              <span className="font-bold text-sidebar-foreground text-lg">Bhavani Veera</span>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                          isActive 
                            ? "bg-sidebar-accent text-sidebar-primary font-medium" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <>
            <Separator className="bg-sidebar-border mx-6" />

            {/* Profile Actions */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {profileItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 px-3 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Button>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="bg-sidebar-border mx-6" />

            {/* Project Categories */}
            <SidebarGroup className="flex-1">
              <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider font-medium px-3">
                Project Categories
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {projectCategories.map((category) => (
                    <SidebarMenuItem key={category.title}>
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-3 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary text-sm"
                        onClick={() => {
                          // Handle category filtering
                          console.log('Filter by:', category.filter);
                        }}
                      >
                        <span className="truncate">{category.title}</span>
                        <span className="text-xs text-sidebar-foreground/60">{category.count}</span>
                      </Button>
                    </SidebarMenuItem>
                  ))}
                  
                  <Separator className="bg-sidebar-border mx-3 my-2" />
                  
                  <SidebarMenuItem>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary text-sm"
                      onClick={() => setShowMoodSelector(true)}
                    >
                      <span>🎵 Change Vibe</span>
                    </Button>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
