'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, UseFormReturn } from 'react-hook-form';

import { ActivityFormData, activityFormSchema } from '../../shared/schemas/activity-form-schema';
import { Activity } from '../../shared/types/activity-types';
import { invalidateAllActivitiesQueries } from '../data-hooks/demo-query-keys';

let activityIdCounter = 1;

const createActivity = async (data: ActivityFormData): Promise<Activity> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newActivity: Activity = {
    id: `activity-${activityIdCounter++}`,
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: data.status,
    createdAt: new Date(),
  };

  const stored = localStorage.getItem('activities');
  const existingActivities: Activity[] = stored ? JSON.parse(stored) : [];
  const updatedActivities = [...existingActivities, newActivity];
  localStorage.setItem('activities', JSON.stringify(updatedActivities));

  return newActivity;
};

interface UseActivityForm {
  form: UseFormReturn<ActivityFormData>;
  onSubmit: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: unknown;
}

export function useActivityForm(): UseActivityForm {
  const queryClient = useQueryClient();

  const form = useForm<ActivityFormData>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
    },
  });

  const createMutation = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => invalidateAllActivitiesQueries(query.queryKey),
      });
      form.reset();
    },
  });

  const onSubmit = (data: ActivityFormData): void => {
    createMutation.mutate(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: createMutation.isPending,
    isSuccess: createMutation.isSuccess,
    error: createMutation.error,
  };
}
