'use client';

import {
  Activity,
  BookOpen,
  Code2,
  Home,
  Layers3,
  Package,
  Palette,
  Settings,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { For } from '@/components/atoms';
import { LanguageToggle, ThemeSelector } from '@/components/molecules/controls';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

const sidebarData = [
  {
    title: 'Overview',
    items: [
      { title: 'Home', icon: Home, isActive: true },
      { title: 'Components', icon: Layers3 },
      { title: 'Features', icon: Zap },
    ],
  },
  {
    title: 'Demo Sections',
    items: [
      { title: 'Activities', icon: Activity },
      { title: 'Products', icon: Package },
      { title: 'Forms', icon: BookOpen },
    ],
  },
  {
    title: 'Development',
    items: [
      { title: 'Layout System', icon: Code2 },
      { title: 'Theming', icon: Palette },
      { title: 'Settings', icon: Settings },
    ],
  },
];

export function DemoSidebar(): React.JSX.Element {
  const t = useTranslations();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">{t('app.name')}</span>
            <span className="truncate text-xs text-muted-foreground">Demo Showcase</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <For each={sidebarData}>
          {(group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <For each={group.items}>
                    {(item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton isActive={item.isActive}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </For>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </For>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center justify-between w-full px-2 group-data-[collapsible=icon]:justify-center">
                  <span className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                    Theme & Language
                  </span>
                  <div className="flex items-center gap-1">
                    <ThemeSelector />
                    <LanguageToggle />
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
