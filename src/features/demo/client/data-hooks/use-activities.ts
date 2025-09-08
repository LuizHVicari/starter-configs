'use client';

import { useQuery } from '@tanstack/react-query';

import { Activity } from '../../shared/types/activity-types';
import { activitiesQueryKey } from './demo-query-keys';

const getActivities = async (): Promise<Activity[]> => {
  const stored = localStorage.getItem('activities');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};

export function useActivities(): ReturnType<typeof useQuery<Activity[]>> {
  return useQuery<Activity[]>({
    queryKey: activitiesQueryKey(),
    queryFn: getActivities,
    initialData: [],
  });
}
