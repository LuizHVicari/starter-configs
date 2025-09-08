'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { setLocale } from '@/features/common/server/actions/locale-actions';

export function LanguageToggle(): React.JSX.Element {
  const t = useTranslations();

  return (
    <Tooltip>
      <TooltipContent>{t('common.toggleLanguage')}</TooltipContent>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Globe />
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={async () => setLocale('en')}>English</DropdownMenuItem>
          <DropdownMenuItem onClick={async () => setLocale('pt')}>Português</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  );
}
