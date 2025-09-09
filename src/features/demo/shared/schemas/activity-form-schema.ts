import { z } from 'zod';

export const activityFormSchema = z.object({
  title: z.string().min(1, 'forms.messages.required').max(100, 'activity.validation.titleTooLong'),
  description: z
    .string()
    .min(1, 'forms.messages.required')
    .max(500, 'activity.validation.descriptionTooLong'),
  priority: z.enum(['low', 'medium', 'high'], {
    error: 'forms.messages.required',
  }),
  status: z.enum(['todo', 'in-progress', 'completed'], {
    error: 'forms.messages.required',
  }),
});

export type ActivityFormData = z.infer<typeof activityFormSchema>;
