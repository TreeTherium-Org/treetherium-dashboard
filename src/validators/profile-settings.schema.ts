import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const profileFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }), // Add first_name
  last_name: z.string().min(1, { message: messages.lastNameRequired }), // Add last_name
  username: z.string().min(1, { message: messages.firstNameRequired }),
  website: z.string().optional(),
  email: validateEmail,
  role: z.string({ required_error: messages.roleIsRequired }),
  description: z.string().optional(),
  avatar: fileSchema.optional(),
  portfolios: z.array(fileSchema).optional(),
});

// generate form types from zod validation schema
export type ProfileFormTypes = z.infer<typeof profileFormSchema>;

export const defaultValues = {
  first_name: '', // Initialize default value for first_name
  last_name: '',  // Initialize default value for last_name
  username: 'Giselle',
  website: undefined,
  email: undefined,
  role: undefined,
  avatar: undefined,
  description: '<p>Similique cupidatat .</p>',
  portfolios: undefined,
};
