'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Globe } from 'lucide-react';
import Image from 'next/image';
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
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={async () => setLocale('en')}
          >
            <Image alt="English Flag" height={20} src="/flags/united-states.svg" width={20} />
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 items-center"
            onClick={async () => setLocale('pt')}
          >
            <Image alt="Brazilian Flag" height={20} src="/flags/brazil.svg" width={20} />
            Português
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  );
}
