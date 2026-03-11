import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { useCurrentLang } from '@/i18n/navigation'

export interface PageWithTableProps<T = Record<string, unknown>> {
  title: string
  rows: T[]
  columns: GridColDef[]
  getRowId: (row: T) => string
  toolbar?: React.ReactNode
}

export function PageWithTable<T = Record<string, unknown>>({ title, rows, columns, getRowId, toolbar }: PageWithTableProps<T>) {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const lang = useCurrentLang()
  const isRtl = lang === 'ar'

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {title}
        </Typography>
        {toolbar}
      </Box>
      <Box sx={{ width: '100%', overflowX: 'auto', minHeight: 300 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            minWidth: 400,
            /* RTL: flip pagination arrows */
            ...(isRtl && {
              '& .MuiTablePagination-actions .MuiSvgIcon-root': { transform: 'scaleX(-1)' },
              /* RTL: force header align right for columns that have headerAlign right */
              '& .MuiDataGrid-columnHeader[data-field="name"] .MuiDataGrid-columnHeaderTitleContainer': { justifyContent: 'flex-end' },
              '& .MuiDataGrid-columnHeader[data-field="studentName"] .MuiDataGrid-columnHeaderTitleContainer': { justifyContent: 'flex-end' },
              '& .MuiDataGrid-columnHeader[data-field="title"] .MuiDataGrid-columnHeaderTitleContainer': { justifyContent: 'flex-end' },
            }),
          }}
        />
      </Box>
    </Box>
  )
}
