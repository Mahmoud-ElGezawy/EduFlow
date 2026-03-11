import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Radio,
  Checkbox,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon, DragIndicator as DragIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { QUIZ_QUESTION_TYPES, type CreateLessonInput, type QuizQuestion, type QuizQuestionType } from '../schemas/create-lesson.schema'

const defaultQuestion: QuizQuestion = {
  question: '',
  questionType: 'single',
  options: [
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
  ],
  points: 1,
}

export function QuizBuilder() {
  const { t } = useTranslation('lessons')
  const { control } = useFormContext<CreateLessonInput>()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'quizQuestions',
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = fields.findIndex((f) => f.id === active.id)
    const newIndex = fields.findIndex((f) => f.id === over.id)
    if (oldIndex !== -1 && newIndex !== -1) {
      move(oldIndex, newIndex)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {t('quiz.questions')}
        </Typography>
        <Button
          type="button"
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => append(defaultQuestion)}
        >
          {t('quiz.addQuestion')}
        </Button>
      </Box>
      {fields.length === 0 && (
        <Typography color="text.secondary" variant="body2">
          {t('quiz.emptyHint')}
        </Typography>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {fields.map((field, qIndex) => (
            <SortableQuestionCard
              key={field.id}
              id={field.id}
              questionIndex={qIndex}
              onRemove={() => remove(qIndex)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  )
}

function SortableQuestionCard({
  id,
  questionIndex,
  onRemove,
}: {
  id: string
  questionIndex: number
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <QuestionCard questionIndex={questionIndex} onRemove={onRemove} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  )
}

function QuestionCard({
  questionIndex,
  onRemove,
  dragHandleProps,
}: {
  questionIndex: number
  onRemove: () => void
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}) {
  const { t } = useTranslation('lessons')
  const { control, register, formState: { errors }, watch, setValue } = useFormContext<CreateLessonInput>()
  const questionType = watch(`quizQuestions.${questionIndex}.questionType`)

  const handleTypeChange = (newType: QuizQuestionType) => {
    setValue(`quizQuestions.${questionIndex}.questionType`, newType)
    if (newType === 'true_false') {
      setValue(`quizQuestions.${questionIndex}.options`, [
        { text: t('quiz.true'), isCorrect: true },
        { text: t('quiz.false'), isCorrect: false },
      ])
      setValue(`quizQuestions.${questionIndex}.correctAnswers`, undefined)
    } else if (newType === 'short_answer') {
      setValue(`quizQuestions.${questionIndex}.options`, undefined)
      setValue(`quizQuestions.${questionIndex}.correctAnswers`, [''])
    } else {
      setValue(`quizQuestions.${questionIndex}.options`, [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
      ])
      setValue(`quizQuestions.${questionIndex}.correctAnswers`, undefined)
    }
  }

  return (
    <Card variant="outlined" sx={{ overflow: 'visible' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          {dragHandleProps && (
            <Box
              {...dragHandleProps}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'grab',
                color: 'text.secondary',
                mt: 1.5,
                '&:active': { cursor: 'grabbing' },
              }}
              aria-label={t('quiz.dragToReorder', { defaultValue: 'Drag to reorder' })}
            >
              <DragIcon />
            </Box>
          )}
          <TextField
            label={t('quiz.questionLabel', { number: questionIndex + 1 })}
            {...register(`quizQuestions.${questionIndex}.question`)}
            error={!!errors.quizQuestions?.[questionIndex]?.question}
            helperText={errors.quizQuestions?.[questionIndex]?.question?.message}
            fullWidth
            multiline
            minRows={2}
          />
          <IconButton color="error" size="small" onClick={onRemove} sx={{ mt: 1 }} aria-label={t('quiz.removeQuestion')}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel>{t('quiz.questionType')}</InputLabel>
            <Select
              value={questionType ?? 'single'}
              label={t('quiz.questionType')}
              onChange={(e) => handleTypeChange(e.target.value as QuizQuestionType)}
            >
              {QUIZ_QUESTION_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {t(`quiz.questionTypes.${type}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label={t('quiz.points')}
            type="number"
            size="small"
            {...register(`quizQuestions.${questionIndex}.points`, { valueAsNumber: true })}
            sx={{ width: 90 }}
            inputProps={{ min: 0, step: 0.5 }}
          />
        </Box>

        {(questionType === 'single' || questionType === 'multiple' || questionType === 'true_false') && (
          <OptionsField questionIndex={questionIndex} questionType={questionType} />
        )}

        {questionType === 'short_answer' && (
          <ShortAnswerField questionIndex={questionIndex} />
        )}

        <TextField
          label={t('quiz.explanation')}
          {...register(`quizQuestions.${questionIndex}.explanation`)}
          fullWidth
          multiline
          minRows={1}
          size="small"
          placeholder={t('quiz.explanationPlaceholder')}
        />
      </CardContent>
    </Card>
  )
}

function OptionsField({ questionIndex, questionType }: { questionIndex: number; questionType: QuizQuestionType }) {
  const { t } = useTranslation('lessons')
  const { control, register, setValue, watch } = useFormContext<CreateLessonInput>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `quizQuestions.${questionIndex}.options`,
  })
  const options = watch(`quizQuestions.${questionIndex}.options`)

  const handleSingleCorrect = (optIndex: number) => {
    options?.forEach((_, i) => {
      setValue(`quizQuestions.${questionIndex}.options.${i}.isCorrect`, i === optIndex)
    })
  }

  const handleMultipleCorrect = (optIndex: number, checked: boolean) => {
    setValue(`quizQuestions.${questionIndex}.options.${optIndex}.isCorrect`, checked)
  }

  const isSingle = questionType === 'single'
  const isTrueFalse = questionType === 'true_false'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pl: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {isSingle && t('quiz.optionsHintSingle')}
        {questionType === 'multiple' && t('quiz.optionsHintMultiple')}
        {isTrueFalse && t('quiz.optionsHintTrueFalse')}
      </Typography>
      {fields.map((field, optIndex) => (
        <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isSingle ? (
            <Radio
              checked={options?.[optIndex]?.isCorrect ?? false}
              onChange={() => handleSingleCorrect(optIndex)}
              size="small"
            />
          ) : (
            <Checkbox
              checked={options?.[optIndex]?.isCorrect ?? false}
              onChange={(e) => handleMultipleCorrect(optIndex, e.target.checked)}
              size="small"
            />
          )}
          <TextField
            size="small"
            placeholder={isTrueFalse ? undefined : t('quiz.optionPlaceholder', { number: optIndex + 1 })}
            {...register(`quizQuestions.${questionIndex}.options.${optIndex}.text`)}
            fullWidth
            disabled={isTrueFalse}
          />
          {!isTrueFalse && fields.length > 2 && (
            <IconButton color="error" size="small" onClick={() => remove(optIndex)} aria-label={t('quiz.removeOption')}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      ))}
      {!isTrueFalse && (
        <Button
          type="button"
          variant="text"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => append({ text: '', isCorrect: false })}
          sx={{ alignSelf: 'flex-start' }}
        >
          {t('quiz.addOption')}
        </Button>
      )}
    </Box>
  )
}

function ShortAnswerField({ questionIndex }: { questionIndex: number }) {
  const { t } = useTranslation('lessons')
  const { control, register } = useFormContext<CreateLessonInput>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `quizQuestions.${questionIndex}.correctAnswers`,
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pl: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {t('quiz.acceptedAnswers')} — {t('quiz.acceptedAnswersHint')}
      </Typography>
      {fields.map((field, i) => (
        <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            placeholder={t('quiz.acceptedAnswerPlaceholder', { number: i + 1 })}
            {...register(`quizQuestions.${questionIndex}.correctAnswers.${i}`)}
            fullWidth
          />
          {fields.length > 1 && (
            <IconButton color="error" size="small" onClick={() => remove(i)} aria-label={t('quiz.removeAnswer')}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      ))}
      <Button
        type="button"
        variant="text"
        size="small"
        startIcon={<AddIcon />}
        onClick={() => append('')}
        sx={{ alignSelf: 'flex-start' }}
      >
        {t('quiz.addAcceptedAnswer')}
      </Button>
    </Box>
  )
}
