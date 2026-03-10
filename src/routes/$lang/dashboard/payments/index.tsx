import { createFileRoute } from '@tanstack/react-router'
import { Box, Typography, Card, CardContent, Grid } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mockDashboardStats, mockPaymentHistory } from '@/api/mock-data'

export const Route = createFileRoute('/$lang/dashboard/payments/')({
  component: PaymentsPage,
})

function PaymentsPage() {
  const { t } = useTranslation()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const columns: GridColDef[] = [
    { field: 'date', headerName: t('payments.date', { ns: 'dashboard' }), flex: 1, minWidth: 100 },
    {
      field: 'amount',
      headerName: t('payments.amount', { ns: 'dashboard' }),
      minWidth: 120,
      valueFormatter: (params: { value?: unknown }) => {
        const v = Number(params?.value ?? 0)
        return v >= 1000 ? `${(v / 1000).toFixed(0)} K` : `${v} EGP`
      },
    },
    {
      field: 'status',
      headerName: t('payments.status', { ns: 'dashboard' }),
      minWidth: 100,
    },
  ]

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        {t('payments', { ns: 'dashboard' })}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                {t('payments.totalEarned', { ns: 'dashboard' })}
              </Typography>
              <Typography variant="h4" color="primary" fontWeight={700}>
                {mockDashboardStats.revenue >= 1000 ? `${(mockDashboardStats.revenue / 1000).toFixed(0)} K` : `${mockDashboardStats.revenue} EGP`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                {t('payments.thisMonth', { ns: 'dashboard' })}
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                4,500 EGP
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {t('payments.payoutHistory', { ns: 'dashboard' })}
          </Typography>
          <Box sx={{ width: '100%', overflowX: 'auto', minHeight: 300 }}>
            <DataGrid
              rows={mockPaymentHistory}
              columns={columns}
              getRowId={(row) => (row as { id: string }).id}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 25]}
              disableRowSelectionOnClick
              autoHeight
              sx={{ minWidth: 400 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
