import { Box, TextField, Button, MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLessonSchema, type CreateLessonInput } from '../schemas/create-lesson.schema'
import { QuizBuilder } from './quiz-builder'

interface CreateLessonFormProps {
  onSubmit: (data: CreateLessonInput) => void
}

export function CreateLessonForm({ onSubmit }: CreateLessonFormProps) {
  const { t } = useTranslation('lessons')
  const methods = useForm<CreateLessonInput>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: '',
      type: 'video',
      videoUrl: '',
      duration: 0,
      quizQuestions: [],
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods

  const lessonType = watch('type')

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, width: '100%' }}>
        <TextField
          label={t('lessonForm.title')}
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
        />
        <TextField
          label={t('lessonForm.type')}
          select
          {...register('type')}
          error={!!errors.type}
          helperText={errors.type?.message}
          fullWidth
        >
          <MenuItem value="video">{t('lessonForm.types.video')}</MenuItem>
          <MenuItem value="quiz">{t('lessonForm.types.quiz')}</MenuItem>
          <MenuItem value="pdf">{t('lessonForm.types.pdf')}</MenuItem>
          <MenuItem value="assignment">{t('lessonForm.types.assignment')}</MenuItem>
        </TextField>
        {lessonType === 'video' && (
          <TextField
            label={t('lessonForm.videoUrl')}
            {...register('videoUrl')}
            error={!!errors.videoUrl}
            helperText={errors.videoUrl?.message}
            fullWidth
          />
        )}
        {lessonType === 'quiz' && (
          <>
            <Typography variant="subtitle2" color="primary" fontWeight={600}>
              {t('lessonForm.quickBuildQuiz')}
            </Typography>
            <QuizBuilder />
          </>
        )}
        <TextField
          label={t('lessonForm.duration')}
          type="number"
          {...register('duration', { valueAsNumber: true })}
          error={!!errors.duration}
          helperText={errors.duration?.message}
          fullWidth
        />
        <Button type="submit" variant="contained">
          {t('lessonForm.addLesson')}
        </Button>
      </Box>
    </FormProvider>
  )
}
