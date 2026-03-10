import { z } from 'zod'

export const createLessonSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['video', 'quiz', 'pdf', 'assignment']),
  videoUrl: z.string().optional(),
  duration: z.number().min(0).optional(),
})

export type CreateLessonInput = z.infer<typeof createLessonSchema>
