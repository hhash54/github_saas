'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Bot, Presentation, CreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const items=[
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Q&A",
        url: "/qa",
        icon: Bot,
    },
    {
        title: "Meetings",
        url: "/meetings",
        icon: Presentation,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard,
    },
]
const projects=[
    {
        name: 'Project 1'
    },
    {
        name: 'Project 2'
    },
    {
        name: 'Project 3'
    },
]
export function AppSidebar() {
    const pathname=usePathname( )
    return (
        <Sidebar collapsible ="icon" variant="floating" >
            <SidebarHeader>
                Logo
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={cn({
                                            'bg-primary text-white': pathname === item.url,
                                            },'list-none')}>
                                        
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
                                        </SidebarMenuButton>
                                  </SidebarMenuItem>
                                )

                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        your projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {projects.map((project) => {
                            return (
                            <SidebarMenuItem key={project.name}>
                                <SidebarMenuButton asChild>
                                <div className="flex items-center space-x-2">
                                    <div
                                    className={cn(
                                        'rounded-sm border size-6 flex items-center justify-center text-sm bg-white',
                                        {
                                        'bg-primary text-white': true // make this dynamic later if needed
                                        }
                                    )}
                                    >
                                    {project.name[0]}
                                    </div>
                                    <span>{project.name}</span>
                                </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            );
                        })}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
