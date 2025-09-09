'use client';

import { useTranslations } from 'next-intl';

import { Show, VStack } from '@/components/atoms';
import { FormInput, FormSelect, FormTextarea } from '@/components/molecules/forms';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { useActivityForm } from '../../forms';

export function ActivityForm(): React.JSX.Element {
  const { form, onSubmit, isSubmitting, isSuccess, error } = useActivityForm();
  const t = useTranslations();

  const priorityOptions = [
    { value: 'low', label: t('activity.priority.low') },
    { value: 'medium', label: t('activity.priority.medium') },
    { value: 'high', label: t('activity.priority.high') },
  ];

  const statusOptions = [
    { value: 'todo', label: t('activity.status.todo') },
    { value: 'in-progress', label: t('activity.status.in-progress') },
    { value: 'completed', label: t('activity.status.completed') },
  ];

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
                labelKey="activity.form.fields.title.label"
                name="title"
                placeholder={t('activity.form.fields.title.placeholder')}
              />
              <FormTextarea
                control={form.control}
                labelKey="activity.form.fields.description.label"
                name="description"
                placeholder={t('activity.form.fields.description.placeholder')}
              />
              <FormSelect
                control={form.control}
                labelKey="activity.form.fields.priority.label"
                name="priority"
                options={priorityOptions}
                placeholderKey="activity.form.fields.priority.placeholder"
              />
              <FormSelect
                control={form.control}
                labelKey="activity.form.fields.status.label"
                name="status"
                options={statusOptions}
                placeholderKey="activity.form.fields.status.placeholder"
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
