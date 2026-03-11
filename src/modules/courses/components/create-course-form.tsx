import { Box, TextField, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCourseSchema, type CreateCourseInput } from '../schemas/create-course.schema'

interface CreateCourseFormProps {
  onSubmit: (data: CreateCourseInput) => void
}

export function CreateCourseForm({ onSubmit }: CreateCourseFormProps) {
  const { t } = useTranslation('course')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseInput>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      grade: '',
      category: '',
    },
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, width: '100%' }}>
      <TextField
        label={t('courseForm.title')}
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
        fullWidth
      />
      <TextField
        label={t('courseForm.description')}
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
        multiline
        rows={4}
        fullWidth
      />
      <TextField
        label={t('courseForm.price')}
        type="number"
        {...register('price', { valueAsNumber: true })}
        error={!!errors.price}
        helperText={errors.price?.message}
        fullWidth
      />
      <TextField label={t('courseForm.grade')} {...register('grade')} fullWidth />
      <TextField label={t('courseForm.category')} {...register('category')} fullWidth />
      <Button type="submit" variant="contained">
        {t('courseForm.createCourse')}
      </Button>
    </Box>
  )
}
