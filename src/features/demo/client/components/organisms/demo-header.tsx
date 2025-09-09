'use client';

import { HStack } from '@/components/atoms';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function DemoHeader(): React.JSX.Element {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b px-6 h-16">
      <SidebarTrigger className="me-3" />
      <Separator className="h-4" orientation="vertical" />
      <HStack>
        <h1 className="text-2xl font-bold">Demo Features Showcase</h1>
        <Badge variant="secondary">Live Demo</Badge>
      </HStack>
    </header>
  );
}
