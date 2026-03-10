import { createQuery } from 'react-query-kit'
import {
  getDashboardStats,
  getAssignments,
  getStudents,
} from '../resources/dashboard.resource'

export const useDashboardStats = createQuery({
  queryKey: ['dashboard', 'stats'],
  fetcher: () => getDashboardStats(),
})

export const useAssignments = createQuery({
  queryKey: ['dashboard', 'assignments'],
  fetcher: () => getAssignments(),
})

export const useStudents = createQuery({
  queryKey: ['dashboard', 'students'],
  fetcher: () => getStudents(),
})
