import { Box, TextField, Button, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createLessonSchema, type CreateLessonInput } from '../schemas/create-lesson.schema'

interface CreateLessonFormProps {
  onSubmit: (data: CreateLessonInput) => void
}

export function CreateLessonForm({ onSubmit }: CreateLessonFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateLessonInput>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: '',
      type: 'video',
      videoUrl: '',
      duration: 0,
    },
  })

  const lessonType = watch('type')

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, width: '100%' }}>
      <TextField
        label="Lesson Title"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
        fullWidth
      />
      <TextField
        label="Lesson Type"
        select
        {...register('type')}
        error={!!errors.type}
        helperText={errors.type?.message}
        fullWidth
      >
        <MenuItem value="video">Video</MenuItem>
        <MenuItem value="quiz">Quiz</MenuItem>
        <MenuItem value="pdf">PDF</MenuItem>
        <MenuItem value="assignment">Assignment</MenuItem>
      </TextField>
      {lessonType === 'video' && (
        <TextField
          label="Video URL"
          {...register('videoUrl')}
          error={!!errors.videoUrl}
          helperText={errors.videoUrl?.message}
          fullWidth
        />
      )}
      <TextField
        label="Duration (minutes)"
        type="number"
        {...register('duration', { valueAsNumber: true })}
        error={!!errors.duration}
        helperText={errors.duration?.message}
        fullWidth
      />
      <Button type="submit" variant="contained">
        Add Lesson
      </Button>
    </Box>
  )
}
