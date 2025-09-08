'use client';

import { useTranslations } from 'next-intl';

import { For, Show, VStack } from '@/components/atoms';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Activity } from '../../../shared/types/activity-types';
import { useActivities } from '../../data-hooks/use-activities';

const priorityVariants = {
  low: 'secondary',
  medium: 'default',
  high: 'destructive',
} as const;

const statusVariants = {
  todo: 'outline',
  'in-progress': 'default',
  completed: 'secondary',
} as const;

function ActivityCard({ activity }: { activity: Activity }): React.JSX.Element {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{activity.title}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={priorityVariants[activity.priority]}>
              {t(`activity.priority.${activity.priority}`)}
            </Badge>
            <Badge variant={statusVariants[activity.status]}>
              {t(`activity.status.${activity.status}`)}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {new Date(activity.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{activity.description}</p>
      </CardContent>
    </Card>
  );
}

export function ActivityList(): React.JSX.Element {
  const { data: activities, isLoading, isError } = useActivities();
  const t = useTranslations();

  return (
    <VStack className="gap-4">
      <Show when={isLoading}>
        <p className="text-center text-muted-foreground">{t('common.loading')}</p>
      </Show>
      <Show when={isError}>
        <p className="text-center text-destructive">{t('common.error')}</p>
      </Show>
      <Show when={activities && activities.length === 0 && !isLoading}>
        <p className="text-center text-muted-foreground">{t('activity.noActivities')}</p>
      </Show>
      <Show when={activities && activities.length > 0}>
        <For each={activities || []}>
          {(activity) => <ActivityCard key={activity.id} activity={activity} />}
        </For>
      </Show>
    </VStack>
  );
}
