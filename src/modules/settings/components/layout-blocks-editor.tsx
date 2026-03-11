import { Box, Card, CardContent, FormControlLabel, Switch, Typography } from '@mui/material'
import { DragIndicator as DragIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ThemeLayoutBlock } from '@/api/mock-data'

interface SortableBlockProps {
  block: ThemeLayoutBlock
  onToggle: (id: string, enabled: boolean) => void
}

function SortableBlock({ block, onToggle }: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Box {...attributes} {...listeners} sx={{ cursor: 'grab', display: 'flex', color: 'text.secondary' }}>
          <DragIcon />
        </Box>
        <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
          {block.title}
        </Typography>
        <FormControlLabel
          control={<Switch checked={block.enabled} onChange={(e) => onToggle(block.id, e.target.checked)} />}
          label=""
        />
      </CardContent>
    </Card>
  )
}

export interface LayoutBlocksEditorProps {
  blocks: ThemeLayoutBlock[]
  onBlocksChange: (blocks: ThemeLayoutBlock[]) => void
}

export function LayoutBlocksEditor({ blocks, onBlocksChange }: LayoutBlocksEditorProps) {
  const { t } = useTranslation('dashboard')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = blocks.findIndex((b) => b.id === active.id)
    const newIndex = blocks.findIndex((b) => b.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return
    const reordered = arrayMove(blocks, oldIndex, newIndex)
    onBlocksChange(reordered.map((b, i) => ({ ...b, order: i })))
  }

  const handleToggle = (id: string, enabled: boolean) => {
    onBlocksChange(
      blocks.map((b) => (b.id === id ? { ...b, enabled } : b))
    )
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        {t('settings.layoutBlocks', { defaultValue: 'Homepage Sections' })}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t('settings.layoutBlocksDescription', { defaultValue: 'Drag to reorder. Toggle to show/hide sections.' })}
      </Typography>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => (
            <SortableBlock key={block.id} block={block} onToggle={handleToggle} />
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  )
}
