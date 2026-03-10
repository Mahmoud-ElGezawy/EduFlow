import { Card, CardContent, Typography } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export interface AnalyticsChartProps {
  title: string
  data: { month: string; [key: string]: string | number | undefined }[]
  dataKeys: { key: string; color: string; name?: string }[]
  valueFormatter?: (value: number) => string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeFormatMonth(m: any): string {
  if (typeof m !== 'string') return String(m ?? '')
  const [y, mo] = m.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(mo, 10) - 1] ?? mo} ${y ?? ''}`
}

export function AnalyticsChart({ title, data, dataKeys, valueFormatter }: AnalyticsChartProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickFormatter={safeFormatMonth} />
            <YAxis tickFormatter={(v) => (valueFormatter && typeof v === 'number' ? valueFormatter(v) : String(v ?? ''))} />
            <Tooltip
              formatter={(value) => [valueFormatter && typeof value === 'number' ? valueFormatter(value) : value, '']}
              labelFormatter={safeFormatMonth}
            />
            <Legend />
            {dataKeys.map(({ key, color, name }) => (
              <Line key={key} type="monotone" dataKey={key} stroke={color} name={name ?? key} strokeWidth={2} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
