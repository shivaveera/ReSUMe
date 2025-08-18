import { Home, Search, Library, Plus, Heart, Download } from "lucide-react";
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
  { title: "Your Library", url: "/library", icon: Library },
];

const libraryItems = [
  { title: "Create Playlist", icon: Plus },
  { title: "Liked Songs", icon: Heart },
  { title: "Downloaded", icon: Download },
];

const playlists = [
  "My Playlist #1",
  "Discover Weekly",
  "Release Radar",
  "Daily Mix 1",
  "Daily Mix 2",
  "Chill Hits",
  "Rock Classics",
  "Electronic Vibes"
];

export function SpotifySidebar() {
  const { open } = useSidebar();
  const collapsed = !open;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
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
            <Separator className="bg-sidebar-border" />

            {/* Library Actions */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {libraryItems.map((item) => (
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

            <Separator className="bg-sidebar-border" />

            {/* Playlists */}
            <SidebarGroup className="flex-1">
              <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider font-medium px-3">
                Playlists
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {playlists.map((playlist) => (
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