import ky from 'ky'

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export const apiClient = ky.create({
  prefixUrl: API_BASE,
  timeout: 5000,
  retry: 0,
  headers: {
    'Content-Type': 'application/json',
  },
})
