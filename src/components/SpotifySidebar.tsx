
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

const projectPlaylists = [
  "Full Stack Projects",
  "Frontend Showcase",
  "Backend APIs", 
  "Mobile Apps",
  "Data Science",
  "DevOps & Cloud",
  "Open Source",
  "Learning Journey"
];

export function SpotifySidebar() {
  const { open } = useSidebar();
  const collapsed = !open;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        {!collapsed && (
          <div className="p-6 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                SV
              </div>
              <span className="font-bold text-sidebar-foreground text-lg">Shiva Veera</span>
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
                  {projectPlaylists.map((playlist) => (
                    <SidebarMenuItem key={playlist}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-3 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary text-sm"
                      >
                        <span className="truncate">{playlist}</span>
                      </Button>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
