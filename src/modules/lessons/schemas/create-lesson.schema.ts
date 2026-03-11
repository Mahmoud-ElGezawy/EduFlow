import { z } from 'zod'

export const QUIZ_QUESTION_TYPES = ['single', 'multiple', 'true_false', 'short_answer'] as const
export type QuizQuestionType = (typeof QUIZ_QUESTION_TYPES)[number]

const quizOptionSchema = z.object({
  text: z.string().min(1, 'Option text is required'),
  isCorrect: z.boolean().default(false),
})

const quizQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  questionType: z.enum(QUIZ_QUESTION_TYPES).default('single'),
  options: z.array(quizOptionSchema).optional(),
  correctAnswers: z.array(z.string()).optional(), // for short_answer: accepted answers
  points: z.number().min(0).optional(),
  explanation: z.string().optional(),
})

export const createLessonSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['video', 'quiz', 'pdf', 'assignment']),
  videoUrl: z.string().optional(),
  duration: z.number().min(0).optional(),
  quizQuestions: z.array(quizQuestionSchema).optional(),
}).superRefine((data, ctx) => {
  if (data.type === 'quiz') {
    if (!data.quizQuestions?.length) {
      ctx.addIssue({ code: 'custom', message: 'Add at least one question for quiz', path: ['quizQuestions'] })
      return
    }
    for (let i = 0; i < data.quizQuestions.length; i++) {
      const q = data.quizQuestions[i]
      if (q.questionType === 'short_answer') {
        if (!q.correctAnswers?.length || !q.correctAnswers.some((a) => a?.trim())) {
          ctx.addIssue({ code: 'custom', message: 'Add at least one accepted answer', path: ['quizQuestions', i] })
        }
      } else {
        const opts = q.options ?? []
        if (opts.length < 2) {
          ctx.addIssue({ code: 'custom', message: 'At least 2 options required', path: ['quizQuestions', i] })
        } else if (!opts.some((o) => o.isCorrect)) {
          ctx.addIssue({ code: 'custom', message: 'Select at least one correct answer', path: ['quizQuestions', i] })
        } else if (q.questionType === 'single' && opts.filter((o) => o.isCorrect).length > 1) {
          ctx.addIssue({ code: 'custom', message: 'Single choice allows only one correct answer', path: ['quizQuestions', i] })
        } else if (opts.some((o) => !o.text?.trim())) {
          ctx.addIssue({ code: 'custom', message: 'All options must have text', path: ['quizQuestions', i] })
        }
      }
    }
  }
})

export type CreateLessonInput = z.infer<typeof createLessonSchema>
export type QuizQuestion = z.infer<typeof quizQuestionSchema>
export type QuizOption = z.infer<typeof quizOptionSchema>
