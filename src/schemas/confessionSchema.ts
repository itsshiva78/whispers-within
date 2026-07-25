import { z } from 'zod';

export const confessionSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Confession content is required' })
    .max(500, { message: 'Confession must be under 500 characters' }),
  category: z
    .enum(['general', 'love', 'funny', 'secret', 'regret', 'gratitude'])
    .optional()
    .default('general'),
  senderName: z.string().max(50, { message: 'Sender name must be under 50 characters' }).optional(),
  senderGender: z.enum(['Male', 'Female', 'Other', '']).optional().default(''),
});
