'use client';

import { useTranslations } from 'next-intl';

import { Show, VStack } from '@/components/atoms';
import { FormInput, FormSelect, FormTextarea } from '@/components/molecules/forms';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { useActivityForm } from '../../forms';

const priorityOptions = [
  { value: 'low', label: 'activity.priority.low' },
  { value: 'medium', label: 'activity.priority.medium' },
  { value: 'high', label: 'activity.priority.high' },
];

const statusOptions = [
  { value: 'todo', label: 'activity.status.todo' },
  { value: 'in-progress', label: 'activity.status.in-progress' },
  { value: 'completed', label: 'activity.status.completed' },
];

export function ActivityForm(): React.JSX.Element {
  const { form, onSubmit, isSubmitting, isSuccess, error } = useActivityForm();
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('activity.form.title')}</CardTitle>
        <CardDescription>{t('activity.form.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <VStack className="gap-4">
              <FormInput
                control={form.control}
                label="activity.form.fields.title.label"
                name="title"
                placeholder="activity.form.fields.title.placeholder"
              />
              <FormTextarea
                control={form.control}
                label="activity.form.fields.description.label"
                name="description"
                placeholder="activity.form.fields.description.placeholder"
              />
              <FormSelect
                control={form.control}
                label="activity.form.fields.priority.label"
                name="priority"
                options={priorityOptions}
                placeholder="activity.form.fields.priority.placeholder"
              />
              <FormSelect
                control={form.control}
                label="activity.form.fields.status.label"
                name="status"
                options={statusOptions}
                placeholder="activity.form.fields.status.placeholder"
              />
              <Show when={error}>
                <p className="text-sm text-destructive">{t('activity.form.error')}</p>
              </Show>
              <Show when={isSuccess}>
                <p className="text-sm text-green-600">{t('activity.form.success')}</p>
              </Show>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? t('activity.form.submitting') : t('activity.form.submit')}
              </Button>
            </VStack>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
